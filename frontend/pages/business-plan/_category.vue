<template>
  <div class="container">
    <h1 class="heading">
      {{ section }}
    </h1>
    <div v-if="$apollo.loading"><Spinner /><br />Retrieving data...</div>
    <div v-if="section === 'All (Search)'" class="search-input">
      <label for="Search">Search: </label>
      <input v-model="searchString" type="text" name="Search" />
    </div>
    <listItems
      v-if="$apolloData.data[dataKey]"
      :data="$apolloData.data[dataKey]"
    />
    <listItems v-else-if="routeCategory === 'Search'" :data="combinedData" />
  </div>
</template>

<script>
import measurementsQuery from '~/apollo/queries/business-plan/measurements'
import strategiesQuery from '~/apollo/queries/business-plan/strategies'
import targetsQuery from '~/apollo/queries/business-plan/targets'
import searchQuery from '~/apollo/queries/business-plan/search'
import businessPlanInfo from '~/assets/businessPlanInfo.json'
import listItems from '~/components/listItems.vue'
import Spinner from '~/components/spinner'

// functions
// add the category as a key:value to the object
function addCategory(data) {
  const dict = {
    measuringSuccesses: 'Measurement',
    strategiesForImprovements: 'Strategy',
    performanceTargets: 'Target',
  }
  Object.keys(data).forEach((key) => {
    data[key].map((n) => (n.category = dict[key]))
  })
  return data
}
// go from focus_area.display = value to focus_area = value
function flattenFocusArea(data) {
  Object.keys(data).forEach((key) => {
    data[key].forEach((n) => {
      n.focus_area = n.focus_area?.display || n.focus_area
    })
  })
  return data
}

// when iterating, only return true if its the first instance of a value
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}
export default {
  components: { listItems, Spinner },
  data() {
    const category = this.$route.params.category
    const section = businessPlanInfo.find((i) => i.name === category).display
    return {
      waitingMessage: 'Communicating with Server...',
      businessPlanInfo,
      section,
      category: this.$route.params.category,
      searchString: null,
      emoji: {
        Strategy: '✍️',
        Measurement: '📏',
        Target: '🎯',
      },
    }
  },
  computed: {
    // so that we can watch the route for changes
    // need a way to trigger on navigation change as the page is the same
    routeCategory() {
      return this.$route.params.category
    },
    // use route category to get relevant data key
    dataKey() {
      const dict = {
        Strategies: 'strategiesForImprovements',
        Measurements: 'measuringSuccesses',
        Targets: 'performanceTargets',
      }
      return dict[this.routeCategory]
    },
    combinedData() {
      if (this.$apolloData.loading) {
        return []
      }
      return [
        ...this.$apolloData?.data?.strategiesForImprovements,
        ...this.$apolloData?.data?.measuringSuccesses,
        ...this.$apolloData?.data?.performanceTargets,
      ].filter((n) =>
        this.searchString ? n.value?.includes(this.searchString) : true
      )
    },
  },
  watch: {
    routeCategory(n, o) {
      this.searchString = null
      this.section = this.businessPlanInfo.find((i) => i.name === n).display
    },
  },
  created() {
    this.category = this.$route.params.category
  },
  methods: {
    onlyUnique(value, index, self) {
      return onlyUnique(value, index, self)
    },
  },
  apollo: {
    // this needs to match the key in results json. prefix the query with data: to alias the output
    measuringSuccesses: {
      prefetch: true,
      query: measurementsQuery,
      variables() {
        return { search: null }
      },
      // TODO: can ammend the results in this way,
      // TODO: need to propagate category through the data object through the rest of the page
      result({ data, loading, networkStatus }) {
        data = addCategory(data)
        data = flattenFocusArea(data)
      },
    },
    strategiesForImprovements: {
      prefetch: true,
      query: strategiesQuery,
      variables() {
        return { search: null }
      },
      result({ data, loading, networkStatus }) {
        data = addCategory(data)
        data = flattenFocusArea(data)
      },
    },
    performanceTargets: {
      prefetch: true,
      query: targetsQuery,
      variables() {
        return { search: null }
      },
      result({ data, loading, networkStatus }) {
        data = addCategory(data)
        data = flattenFocusArea(data)
      },
    },
    search: {
      skip: true,
      prefetch: false,
      query: searchQuery,
      result({ data }) {
        data = [
          ...this.$apolloData.data.measuringSuccesses,
          ...this.$apolloData.data.strategiesForImprovements,
          ...this.$apolloData.data.performanceTargets,
        ]
        return data
      },
    },
  },
}
</script>

<style scoped></style>
