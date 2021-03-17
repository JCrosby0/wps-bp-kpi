<template>
  <div class="cont-indicators">
    <h1>{{ focusArea }} Indicators</h1>
    <div class="arrange-cards">
      <Card
        v-for="(ind, i) in indicators"
        :key="'indicator-' + i"
        :content="ind"
        class="card"
      />
    </div>
  </div>
</template>

<script>
import Card from '~/components/card'
import indicatorsQuery from '~/apollo/queries/indicators/indicators'
export default {
  components: { Card },
  props: {
    category: {
      required: false,
      type: String,
      default: () => 'Category',
    },
  },
  computed: {
    focusArea() {
      return this.$route.params.focusArea
    },
  },
  apollo: {
    indicators: {
      prefetch: true,
      query: indicatorsQuery,
      variables() {
        //   the focusArea should be passed to the page via route?
        return { focusArea: this.$route.params.focusArea }
      },
    },
  },
}
</script>

<style scoped>
.cont-indicators {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.arrange-cards {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: flex-start;
}
.card {
  flex: 0 1 30%;
  border: 1.5%;
  box-sizing: border-box;
}
</style>
