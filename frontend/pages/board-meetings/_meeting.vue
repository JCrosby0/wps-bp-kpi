<template>
  <div class="container">
    <h1 class="heading">Board Meetings</h1>
    <div v-if="$apollo.loading"><Spinner /><br />Retrieving data...</div>
    <div v-else class="results">
      <Table
        v-if="$apolloData.data.meetings"
        :data="$apolloData.data.meetings"
        @meeting="displayMeeting"
      />
      <Modal v-if="showMeeting" @close="showMeeting = false" @ok="handleSubmit">
        <span slot="title"
          >Board Meeting: {{ $apolloData.data.meeting[0].date }}</span
        >
        <div class="meeting">
          <Meeting :data="$apolloData.data.meeting[0]" />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import Spinner from '~/components/spinner'
import Table from '~/components/table-meetings'
import Modal from '~/components/modal'
import Meeting from '~/components/meeting'
import boardMeetingsQuery from '~/apollo/queries/board-meetings/boardMeetings'
import boardMeetingQuery from '~/apollo/queries/board-meetings/boardMeeting'

export default {
  name: 'BoardMeetings',
  components: { Spinner, Table, Modal, Meeting },
  data() {
    return {
      showMeeting: false,
      meetings: [],
      meeting: {},
      meetingId: null,
    }
  },
  methods: {
    displayMeeting(meeting) {
      // meeting.id
      this.meetingId = meeting.id
      this.showMeeting = true
    },
    handleSubmit(payload) {
      console.log('ok clicked, payload: ', payload)
      this.showMeeting = false
    },
  },
  apollo: {
    meetings: {
      prefetch: true,
      query: boardMeetingsQuery,
      result({ data }) {
        console.log(data)
        if (!data.meetings.length) return
        data.meetings.forEach((row, i) => {
          row.presentations = Array.isArray(row.presentations)
            ? row.presentations.length
            : row.presentations
        })
        return data
      },
    },
    meeting: {
      prefetch: false,
      query: boardMeetingQuery,
      variables() {
        return { meeting: this.meetingId }
      },
      result() {},
    },
  },
}
</script>

<style scoped>
#meetings {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
