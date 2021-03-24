<template>
  <div class="business-plan-container">
    <h1 class="heading">
      {{ section }}
    </h1>
    <div v-if="$apollo.loading">
      Waiting on server. This may take up to 30 seconds.
    </div>
    <div v-if="section === 'All (Search)'" class="search-input">
      <label for="Search">Search: </label>
      <input v-model="searchString" type="text" name="Search" />
    </div>
    <ul v-if="selectedCategory">
      <li
        v-for="(key, i) in Object.keys(activeCategory)"
        :key="'display-key-' + i"
        class="focus-area"
      >
        {{ key }}
        <ul>
          <li
            v-for="(value, j) in activeCategory[key]"
            :key="`display-key-${i}-value-${j}`"
            class="item"
          >
            {{ value }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import measurementsQuery from '~/apollo/queries/business-plan/measurements'
import strategiesQuery from '~/apollo/queries/business-plan/strategies'
import targetsQuery from '~/apollo/queries/business-plan/targets'
import search from '~/apollo/queries/business-plan/search'
import businessPlanInfo from '~/assets/businessPlanInfo.json'
export default {
  data() {
    const category = this.$route.params.category
    const section = businessPlanInfo.find((i) => i.name === category).display
    return {
      businessPlanInfo,
      section,
      category: this.$route.params.category,
      searchString: null,
      query:
        category === 'Targets'
          ? targetsQuery
          : category === 'Strategies'
          ? strategiesQuery
          : category === 'Measurements'
          ? measurementsQuery
          : category === 'Search'
          ? search
          : null,
    }
  },
  computed: {
    routeCategory() {
      return this.$route.params.category
    },
    activeCategory() {
      return this.routeCategory === 'Search' && this.searchString
        ? this.filteredCategory
        : this.selectedCategory
    },
    filteredCategory() {
      if (!this.searchString) return this.selectedCategory
      return Object.entries(this.selectedCategory).reduce((acc, cur) => {
        cur[1].forEach((val) => {
          if (val.toLowerCase().includes(this.searchString.toLowerCase())) {
            // check if the key already exists and push the value if it does
            if (Object.keys(acc).includes(cur[0])) {
              acc[cur[0]].push(val)
              // otherwise create and assign it
            } else {
              acc[cur[0]] = [val]
            }
          }
        })
        return acc
      }, {})
    },
    selectedCategory() {
      const data = []
      switch (this.routeCategory) {
        case 'Targets':
          if (!this.performanceTargets || !this.performanceTargets.length) {
            return
          }
          data.push(...this.performanceTargets)
          break
        case 'Strategies':
          if (
            !this.strategiesForImprovements ||
            !this.strategiesForImprovements.length
          ) {
            return
          }
          data.push(...this.strategiesForImprovements)
          break
        case 'Measurements':
          if (!this.measuringSuccesses || !this.measuringSuccesses.length) {
            return
          }
          data.push(...this.measuringSuccesses)
          break
        case 'Search':
          if (this.performanceTargets && this.performanceTargets.length) {
            data.push(...this.performanceTargets)
          }
          if (
            this.strategiesForImprovements &&
            this.strategiesForImprovements.length
          ) {
            data.push(...this.strategiesForImprovements)
          }
          if (this.measuringSuccesses && this.measuringSuccesses.length) {
            data.push(...this.measuringSuccesses)
          }
          break
      }
      return (
        data &&
        data.reduce((acc, val) => {
          if (Object.keys(acc).includes(val.focus_area.display)) {
            acc[val.focus_area.display].push(val.value)
          } else {
            acc[val.focus_area.display] = [val.value]
          }
          return acc
        }, {})
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
    this.query =
      this.category === 'Targets'
        ? targetsQuery
        : this.category === 'Strategies'
        ? strategiesQuery
        : this.category === 'Search'
        ? search
        : measurementsQuery
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
      // result({ data, loading, networkStatus }) {
      //   data.measuringSuccesses = data.measuringSuccesses.map(
      //     (n) => (n.category = 'Measurement')
      //   )
      //   return
      // },
    },
    strategiesForImprovements: {
      prefetch: true,
      query: strategiesQuery,
      variables() {
        return { search: null }
      },
      // result({ data, loading, networkStatus }) {
      //   data.strategiesForImprovements = data.strategiesForImprovements.map(
      //     (n) => (n.category = 'Strategy')
      //   )
      //   return data
      // },
    },
    performanceTargets: {
      prefetch: true,
      query: targetsQuery,
      variables() {
        return { search: null }
      },
      // result({ data, loading, networkStatus }) {
      //   data.performanceTargets = data.performanceTargets.map(
      //     (n) => (n.category = 'Target')
      //   )
      //   return data
      // },
    },
  },
}
</script>

<style scoped>
.buttons {
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.business-plan-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: auto;
  padding: 1rem;
}
.active {
  background: #35495e;
  color: white;
}
li.focus-area {
  font-size: 1.2rem;
}
li.item {
  font-size: 1rem;
}
</style>
