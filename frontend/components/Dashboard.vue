<template>
  <div class="dashboard">
    <p v-if="$apolloData.loading"><Loading /></p>
    <div v-if="!$apolloData.loading">
      <p>
        There are currently
        <span class="highlight red">
          {{ $apolloData.data.indicators.aggregate.count }}
        </span>
        indicators and
        <span class="highlight green">
          {{ $apolloData.data.targets.aggregate.count }}
        </span>
        performance targets.
      </p>
      <p>
        There are
        <span class="highlight orange">
          {{ $apolloData.data.targetsIndicators.aggregate.count }}
        </span>
        performance targets not linked to indicators.
      </p>
      <p>
        Progress towards
        <span class="highlight red">
          {{ $apolloData.data.noted.aggregate.count }}
        </span>
        performance targets has been presented to the board:<br />
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
  </div>
</template>

<script>
import indicatorsCount from '~/apollo/queries/dashboard/indicatorsCount.gql'
import targetsCount from '~/apollo/queries/dashboard/targetsCount.gql'
import targetsWithIndicators from '~/apollo/queries/dashboard/targetsWithIndicators.gql'
import boardNoted from '~/apollo/queries/dashboard/indicatorsNotedByBoard.gql'
import boardComplete from '~/apollo/queries/dashboard/boardComplete.gql'
import boardProgress from '~/apollo/queries/dashboard/boardProgress.gql'
import Loading from '~/components/loading'
export default {
  components: {
    Loading,
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
@media only screen and (max-width: 550px) {
  .dashboard {
    font-size: 1.2rem;
  }
  .highlight {
    font-size: 1.5rem;
  }
}
</style>
