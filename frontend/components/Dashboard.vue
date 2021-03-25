<template>
  <div class="dashboard">
    <p v-if="$apolloData.loading">Data is loading... please wait</p>
    <p v-if="!$apolloData.loading">
      There are currently
      <span class="highlight red">
        {{ $apolloData.data.indicators.aggregate.count }}
      </span>
      indicators and
      <span class="highlight green">
        {{ $apolloData.data.targets.aggregate.count }}
      </span>
      performance targets.<br />
      There are
      <span class="highlight orange">
        {{ $apolloData.data.targetsIndicators.aggregate.count }}
      </span>
      performance targets missing indicators.<br />
      So far,
      <span class="highlight red">
        {{ $apolloData.data.noted.aggregate.count }}
      </span>
      indicators have been noted by the board:<br />
      <span class="highlight red">
        {{ $apolloData.data.complete.aggregate.count }}
      </span>
      are complete, and
      <span class="highlight red">
        {{ $apolloData.data.progress.aggregate.count }}
      </span>
      are in progress.
    </p>
  </div>
</template>

<script>
import indicatorsCount from '~/apollo/queries/dashboard/indicatorsCount.gql'
import targetsCount from '~/apollo/queries/dashboard/targetsCount.gql'
import targetsWithIndicators from '~/apollo/queries/dashboard/targetsWithIndicators.gql'
import boardNoted from '~/apollo/queries/dashboard/indicatorsNotedByBoard.gql'
import boardComplete from '~/apollo/queries/dashboard/boardComplete.gql'
import boardProgress from '~/apollo/queries/dashboard/boardProgress.gql'
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
    indicators: {
      prefetch: true,
      query: indicatorsCount,
    },
    targets: {
      prefetch: true,
      query: targetsCount,
    },
    targetsIndicators: {
      prefetch: true,
      query: targetsWithIndicators,
    },
    noted: {
      prefetch: true,
      query: boardNoted,
    },
    complete: {
      prefetch: true,
      query: boardComplete,
    },
    progress: {
      prefetch: true,
      query: boardProgress,
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
