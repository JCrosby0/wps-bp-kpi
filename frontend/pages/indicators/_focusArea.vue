<template>
  <div class="container">
    <div class="indicators">
      <h1 class="heading">{{ focusArea }} Indicators</h1>
      <div v-if="$apolloData.loading"><Spinner /><br />Retrieving data...</div>
      <div class="arrange-cards">
        <Card
          v-for="(ind, i) in indicators"
          :key="'indicator-' + i"
          :content="ind"
          class="card"
        />
        <div v-if="indicators && !indicators.length">
          There are no indicators matching this category.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/card'
import indicatorsFilteredQuery from '~/apollo/queries/indicators/indicatorsFiltered'
import Spinner from '~/components/spinner'
export default {
  components: { Card, Spinner },
  props: {
    category: {
      required: false,
      type: String,
      default: () => 'Category',
    },
  },
  data() {
    return {
      waitingOnServer: true,
    }
  },
  computed: {
    focusArea() {
      return this.$route.params.focusArea
    },
  },
  apollo: {
    indicators: {
      prefetch: true,
      query: indicatorsFilteredQuery,
      variables() {
        //   the focusArea should be passed to the page via route?
        return { focusArea: this.$route.params.focusArea }
      },
    },
  },
}
</script>

<style scoped>
.indicators {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.arrange-cards {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
}
.card {
  border: 1.5%;
  box-sizing: border-box;
}
</style>
