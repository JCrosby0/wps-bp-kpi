<template>
  <div class="business-plan-container">
    <h1 class="heading">
      {{ section }}
    </h1>
    <ul v-if="data">
      <li
        v-for="(key, i) in Object.keys(selectedCategory)"
        :key="'display-key-' + i"
        class="focus-area"
      >
        {{ key }}
        <ul>
          <li
            v-for="(value, j) in selectedCategory[key]"
            :key="`display-key-${i}-value-${j}`"
            class="item"
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
    const category = this.$route.params.category
    const section = businessPlanInfo.find((i) => i.name === category).display
    return {
      businessPlanInfo,
      section,
      category,
      query:
        category === 'Targets'
          ? targetsQuery
          : category === 'Strategies'
          ? strategiesQuery
          : category === 'Measurements'
          ? measurementsQuery
          : null,
    }
  },
  computed: {
    selectedCategory() {
      return (
        this.data &&
        this.data.reduce((acc, val) => {
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
    category(n, o) {
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
        : measurementsQuery
  },
  apollo: {
    // this needs to match the key in results json. prefix the query with data: to alias the output
    data: {
      prefetch: false,
      query() {
        // cannot use 'this' without making this a function
        return this.query
      },
      // NYI
      variables() {
        return { id: parseInt(this.$route.params.id) }
      },
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
