<template>
  <div class="business-plan-container">
    <h1 class="heading">
      {{ category }}
    </h1>
    <!-- <div class="buttons">
      <nuxt-link
        v-for="button in businessPlanInfo"
        :key="'button' + button.name"
        :class="{
          'button--grey': true,
          active: button.name === category,
        }"
        :to="{
          name: 'business-plan-category',
          params: {
            category: button.name,
          },
        }"
      >
        {{ button.name }}
      </nuxt-link>
    </div> -->
    <ul v-if="data">
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
      businessPlanInfo,
      category: this.$route.params.category,
      query:
        this.category === 'Targets'
          ? targetsQuery
          : this.category === 'Strategies'
          ? strategiesQuery
          : measurementsQuery,
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
</style>
