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
        <template #details>
          <Details
            ref="rowDetails"
            :data="meeting[0]"
            @update="(index) => handleActions('update', index)"
            @delete="(index) => handleActions('delete', index)"
        /></template>
        <template #actions="slotCtxt">
          <button
            v-if="slotCtxt.row.id == meetingId"
            class="button--grey"
            @click="addPresentation(slotCtxt.row)"
          >
            Add Presentation
          </button>
          <button v-else class="button--grey" @click="handleRowClick">
            Select Row
          </button>
        </template>
      </Table>
      <Modal v-if="showModal" @close="showModal = false">
        <template #title>{{ modalTitle }}</template>
        <template #default class="meeting">
          <AddPresentation
            ref="addPresentation"
            :data="$apolloData.data.meeting[0]"
            :presentation-index="presentationIndex"
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
import updatePresentation from '~/apollo/mutations/presentations/updatePresentation'
import deletePresentation from '~/apollo/mutations/presentations/deletePresentation'
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
      showModal: false,
      modalTitle: 'Presentation',
      meetings: [],
      meeting: {},
      meetingId: null,
      presentationId: null,
      presentationIndex: null,
      buttons: [
        new Button('Submit', 'Submit Form', this.handleSubmit, 'positive'),
        new Button('Reset', 'Reset Form', this.handleReset),
        new Button('Cancel', 'Close Window', this.closeWindow),
      ],
    }
  },
  methods: {
    closeWindow() {
      this.showModal = false
    },
    displayMeeting(meeting) {
      // meeting.id
      this.meetingId = meeting.id
    },
    handleSubmit(event, form = this.$refs.addPresentation.form) {
      if (this.presentationId === null) {
        this.$apollo
          .mutate({
            mutation: addPresentation,
            variables: {
              meeting: this.meeting[0].id,
              indicator: form.indicator.id,
              presenter: form.presenter,
              comments: form.comments,
              completeness: form.completeness, // "NOTYETACHIEVED"
              grade: form.grade, // "UNKNOWN"
            },
            // update(cache, { data: { createPresentation } }) {
            //   console.log('cache: ', cache)
            // },
          })
          .then((res) => {
            this.handleReset()
            this.showModal = false
          })
          .catch((err) => {
            this.$refs.addPresentation.message = err
          })
      } else {
        this.$apollo
          .mutate({
            mutation: updatePresentation,
            variables: {
              presId: this.presentationId,
              meeting: this.meeting[0].id,
              indicator: form.indicator.id,
              presenter: form.presenter,
              comments: form.comments,
              completeness: form.completeness, // "NOTYETACHIEVED"
              grade: form.grade, // "UNKNOWN"
            },
            // update(cache, { data: { createPresentation } }) {
            //   console.log('cache: ', cache)
            // },
          })
          .then((res) => {
            this.handleReset()
            this.showModal = false
          })
          .catch((err) => {
            this.$refs.addPresentation.message = err
          })
      }
    },
    handleReset() {
      this.$refs.addPresentation.message = ''
      this.$refs.addPresentation.form = {
        presenter: null,
        comments: null,
        indicator: { name: null, id: null },
        completeness: null,
        grade: null,
      }
    },
    addPresentation(meeting) {
      this.modalTitle = 'Add Presentation'
      this.meetingId = meeting.id
      this.presentationId = null
      this.showModal = true
    },
    updatePresentation(meeting, presentation, index) {
      this.modalTitle = 'Update Presentation'
      this.meetingId = meeting.id
      this.presentationId = presentation.id
      this.presentationIndex = index
      this.showModal = true
    },
    deletePresentation(presentation) {
      this.$apollo
        .mutate({
          mutation: deletePresentation,
          variables: {
            pres: presentation.id,
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
    handleRowClick(row) {
      this.meetingId = this.meetingId === row.id ? null : row.id
    },
    handleActions(method, index, row) {
      if (method === 'update') {
        this.updatePresentation(
          this.meeting[0],
          this.$refs.rowDetails.data.presentations[index],
          index
        )
      } else {
        window.confirm('Confirm delete presentation?') &&
          this.deletePresentation(
            this.$refs.rowDetails.data.presentations[index]
          )
      }
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
    },
  },
}
</script>
