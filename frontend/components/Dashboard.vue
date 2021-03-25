<template>
  <div class="dashboard">
    <p v-if="$apolloData.loading">Data is loading... please wait</p>
    <p v-if="!$apolloData.loading">
      There are currently
      <span class="highlight red">
        {{ $apolloData.data.indicatorsConnection.aggregate.count }}
      </span>
      indicators and
      <span class="highlight green">
        {{ $apolloData.data.performanceTargetsConnection.aggregate.count }}
      </span>
      performance targets.<br />
      There are
      <span class="highlight orange">
        {{ $apolloData.data.performanceTargets }}
      </span>
      performance targets missing indicators.<br />
      So far,
      {{ 'N/A' }}
      indicators have been noted by the board.<br />
      Of these,
      {{ 'N/A' }}
      are complete, and {{ 'N/A' }} are in progress.
    </p>
  </div>
</template>

<script>
import indicatorsCount from '~/apollo/queries/dashboard/indicatorsCount.gql'
import targetsCount from '~/apollo/queries/dashboard/targetsCount.gql'
import targetsWithIndicators from '~/apollo/queries/dashboard/targetsWithIndicators.gql'
export default {
  computed: {
    // difference() {
    //   if (this.$apolloData.loading) return null
    //   const diff =
    //     parseInt(
    //       this.$apolloData.data.performanceTargetsConnection.aggregate.count
    //     ) - parseInt(this.$apolloData.data.indicatorsConnection.aggregate.count)
    //   return diff
    // },
  },
  apollo: {
    indicatorsConnection: {
      prefetch: true,
      query: indicatorsCount,
    },
    performanceTargetsConnection: {
      prefetch: true,
      query: targetsCount,
    },
    performanceTargets: {
      prefetch: false,
      query: targetsWithIndicators,
    },
  },
}
</script>

<style scoped>
.dashboard {
  padding: 1rem;
  background: #eee;
  border: 1px black solid;
  font-size: 2rem;
}
.highlight {
  font-size: 3rem;
  font-weight: bold;
}
.green {
  color: green;
}
.orange {
  color: var(--color-orange);
}
.red {
  color: red;
}
</style>
