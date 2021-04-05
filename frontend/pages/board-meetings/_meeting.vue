<template>
  <div class="container">
    <h1 class="heading">Board Meetings</h1>
    <div v-if="$apollo.loading"><Spinner /><br />Retrieving data...</div>
    <div v-else class="results">
      <span class="instructions"
        >Click on a row to expand details of the meeting.
      </span>
      <Table
        v-if="$apolloData.data.meetings"
        :data="$apolloData.data.meetings"
        :meeting-id="meetingId"
        header-key="meetings"
        @rowSelect="handleRowClick"
        @presentation="addPresentation"
      >
        <template #details> <Details :data="meeting[0]" /></template>
        <template #actions="slotCtxt">
          <button class="button--grey" @click="addPresentation(slotCtxt.row)">
            Add Presentation
          </button>
        </template>
      </Table>
      <Modal v-if="showMeeting" @close="showMeeting = false">
        <template #title>Add Presentation</template>
        <template #default class="meeting">
          <AddPresentation
            ref="addPresentation"
            :data="$apolloData.data.meeting[0]"
          />
        </template>
        <template #actions>
          <button
            v-for="button in buttons"
            :key="button.display"
            :title="button.title"
            :class="button.classes"
            @click="button.click"
          >
            {{ button.display }}
          </button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import Spinner from '~/components/spinner'
import Table from '~/components/table-meetings'
import Modal from '~/components/modal'
import Details from '~/components/table-meeting-row-details'
import AddPresentation from '~/components/add-presentation'
import boardMeetingsQuery from '~/apollo/queries/board-meetings/boardMeetings'
import boardMeetingQuery from '~/apollo/queries/board-meetings/boardMeeting'
import addPresentation from '~/apollo/mutations/presentations/addPresentation'
class Button {
  constructor(display, title, click, addClass = 'negative') {
    this.classes = 'buttons ' + addClass
    this.display = display
    this.title = title
    this.click = click
  }
}

export default {
  name: 'BoardMeetings',
  components: { Spinner, Table, Modal, AddPresentation, Details },
  data() {
    return {
      showMeeting: false,
      meetings: [],
      meeting: {},
      meetingId: null,
      buttons: [
        new Button('Submit', 'Submit Form', this.handleSubmit, 'positive'),
        new Button('Reset', 'Reset Form', this.handleReset),
        new Button('Cancel', 'Close Window', this.closeWindow),
      ],
    }
  },
  methods: {
    closeWindow() {
      this.showMeeting = false
    },
    displayMeeting(meeting) {
      // meeting.id
      this.meetingId = meeting.id
    },
    handleSubmit(event, form = this.$refs.addPresentation.form) {
      console.log('this.meeting[0].id: ', this.meeting[0].id)
      console.log('form', form)
      this.showMeeting = false
      this.$apollo
        .mutate({
          mutation: addPresentation,
          // mutation: gql`
          //   mutation CreatePresentation(
          //     $meeting: ID
          //     $indicator: ID
          //     $presenter: String
          //     $comments: String
          //     $status: ENUM_PRESENTATIONS_PROGRESSSTATUS = ${form.progressStatus}
          //     $achieved: ENUM_PRESENTATIONS_PROGRESSACHIEVED = ${form.progressAchieved}
          //   ) {
          //     createPresentation(
          //       input: {
          //         data: {
          //           meeting: $meeting
          //           indicator: $indicator
          //           presenter: $presenter
          //           comments: $comments
          //         }
          //       }
          //     ) {
          //       presentation {
          //         id
          //         presenter
          //         comments
          //         indicator {
          //           id
          //           name
          //         }
          //         progressStatus
          //         progressAchieved
          //       }
          //     }
          //   }
          // `,
          variables: {
            meeting: this.meeting[0].id,
            indicator: form.indicator.id,
            presenter: form.presenter,
            comments: form.comments,
            status: form.progressStatus, // "NOTYETACHIEVED"
            achieved: form.progressAchieved, // "UNKNOWN"
            test: 'PASS',
          },
          // update(cache, { data: { createPresentation } }) {
          //   console.log('cache: ', cache)
          // },
        })
        .then((res) => {
          console.log('res: ', res)
        })
        .catch((err) => {
          console.error('err: ', err)
        })
    },
    handleReset() {
      this.$refs.addPresentation.form = {
        Presenter: null,
        Comments: null,
        indicator: { name: null },
        progressStatus: null,
        progressAchieved: null,
      }
    },
    addPresentation(meeting) {
      this.meetingId = meeting.id
      this.showMeeting = true
    },
    handleRowClick(row) {
      this.meetingId = this.meetingId === row.id ? null : row.id
    },
  },
  apollo: {
    meetings: {
      prefetch: true,
      query: boardMeetingsQuery,
      result({ data }) {
        data.meetings.forEach((row, i) => {
          row.presentations = Array.isArray(row.presentations)
            ? row.presentations.length
            : row.presentations
        })
        return data
      },
    },
    meeting: {
      skip() {
        return !this.meetingId
      },
      prefetch: false,
      query: boardMeetingQuery,
      variables() {
        return { meeting: this.meetingId }
      },
      result({ data }) {
        // returns an array with one element
        data.meeting.forEach((row, i) => {
          row.presentations.forEach((pres) => {
            pres.indicator =
              typeof pres.indicator === 'object'
                ? pres.indicator.name
                : pres.indicator
          })
        })
        return data
      },
    },
  },
}
</script>
