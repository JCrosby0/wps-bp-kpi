<template>
  <div class="container">
    <h1>
      {{ slug }}
    </h1>
    <div class="buttons">
      <nuxt-link
        v-for="button in businessPlanInfo"
        :key="'button' + button.name"
        :class="{
          'button--grey': true,
          active: button.name === slug,
        }"
        :to="{
          name: 'business-plan-slug',
          params: {
            slug: button.name,
          },
        }"
      >
        {{ button.name }}
      </nuxt-link>
    </div>
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
  // async asyncData({ params }) {
  //   const slug = await params.slug // When calling /abc the slug will be "abc"
  //   const query =
  //     slug === 'Targets'
  //       ? targetsQuery
  //       : slug === 'Strategies'
  //       ? strategiesQuery
  //       : measurementsQuery
  //   return { slug, query }
  // },
  data() {
    return {
      businessPlanInfo,
      slug: this.$route.params.slug,
      query:
        this.slug === 'Targets'
          ? targetsQuery
          : this.slug === 'Strategies'
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
  flex-direction: row;
  text-align: center;
  flex-wrap: wrap;
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
