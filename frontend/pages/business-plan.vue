<template>
  <div class="container">
    <h1>
      {{ currentTab || $route.params.selection }}
    </h1>
    <div class="buttons">
      <a
        v-for="button in businessPlanInfo"
        :key="'button' + button.name"
        :class="{
          'button--grey': true,
          active: button.name === currentTab,
        }"
        @click="setCurrentTab(button.name)"
      >
        {{ button.name }}
      </a>
    </div>
    <ul v-if="selectedCategory">
      <li
        v-for="(key, i) in Object.keys(selectedCategory)"
        :key="'display-key-' + i"
      >
        {{ key }}
        <ul>
          <li
            v-for="(value, j) in selectedCategory[key]"
            :key="`display-key-${i}-value-${j}`"
          >
            {{ value }}
          </li>
        </ul>
      </li>
    </ul>
    <!-- {{ selectedCategory }} -->
  </div>
</template>

<script>
import measurementsQuery from '~/apollo/queries/business-plan/measurements'
import strategiesQuery from '~/apollo/queries/business-plan/strategies'
import targetsQuery from '~/apollo/queries/business-plan/targets'
import businessPlanInfo from '~/assets/businessPlanInfo.json'
export default {
  data() {
    return {
      currentTab: 'Strategies',
      businessPlanInfo,
    }
  },
  computed: {
    selectedCategory() {
      let data = []
      switch (this.currentTab) {
        case 'Measurements':
          data = this.measuringSuccesses
          break
        case 'Targets':
          data = this.performanceTargets
          break
        case 'Strategies':
          data = this.strategiesForImprovements
          break
        default:
          return []
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
  mounted() {
    this.currentTab = this.$route.params.selection
  },
  methods: {
    setCurrentTab(tab) {
      console.log('setting current tab to: ', tab)
      this.currentTab = tab
      console.log(this.currentTab)
    },
  },
  apollo: {
    measuringSuccesses: {
      // this needs to match the key in results json
      prefetch: true,
      query: measurementsQuery, // this is the query we imported
      variables() {
        return { id: parseInt(this.$route.params.id) }
      },
    },
    performanceTargets: {
      prefetch: true,
      query: targetsQuery,
    },
    strategiesForImprovements: {
      prefetch: true,
      query: strategiesQuery,
    },
  },
}
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.active {
  background: #35495e;
  color: white;
}
</style>
