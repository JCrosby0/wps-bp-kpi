<template>
  <div class="container">
    <h1 class="heading">Board Meetings</h1>
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
    meetings: {
      prefetch: true,
      query: boardMeetingsQuery,
      result({ data }) {
        console.log(data)
      },
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: auto;
  padding: 1rem;
}
</style>
