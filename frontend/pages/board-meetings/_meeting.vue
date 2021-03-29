<template>
  <div>
    <h1>Board Meetings</h1>
    <div v-if="$apollo.loading"><Spinner /><br />Retrieving data...</div>
    <div v-else class="results">
      {{ $route.params.meeting }}
      {{ $apolloData.data }}
    </div>
  </div>
</template>

<script>
import Spinner from '~/components/spinner'
import boardMeetingsQuery from '~/apollo/queries/board-meetings/boardMeetings'
// import boardMeetingQuery from '~/apollo/queries/board-meetings/boardMeeting'
export default {
  name: 'BoardMeetings',
  components: { Spinner },
  apollo: {
    boardMeetings: {
      prefetch: true,
      query: boardMeetingsQuery,
      result() {},
    },
    // boardMeeting: {
    //   prefetch: false,
    //   query: boardMeetingQuery,
    //   variables() {
    //     return {
    //       meeting: this.$route.params.meeting || null,
    //     }
    //   },
    //   result() {},
    // },
  },
}
</script>

<style></style>
