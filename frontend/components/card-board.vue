<template>
  <div class="card-board">
    <div class="label">Date Last Noted:</div>
    <div :class="styleClass">{{ dateLastNoted }}</div>
    <div class="label">Completion:</div>
    <div class="found">{{ completion }}</div>
    <div class="label">Progress:</div>
    <div class="found">{{ progress }}</div>
  </div>
</template>

<script>
import presentationByIndicatorQuery from '~/apollo/queries/presentations/presentationsByIndicator.gql'
export default {
  props: {
    content: {
      type: Object,
      required: true,
      default: () => {
        return {
          boardDateLastNoted: 'Not yet noted',
          boardStatusProgress: 'Not yet started',
          boardStatusAchieved: 'Not complete',
        }
      },
    },
  },
  computed: {
    filteredPresentations() {
      return (
        this.presentations
          ?.filter((p) => p.indicator.id === this.content.id)
          .sort((a, b) => (a.meeting.week < b.meeting.week ? -1 : 1))
          .sort((a, b) => (a.meeting.term < b.meeting.term ? -1 : 1))
          .sort((a, b) => (a.meeting.year < b.meeting.year ? -1 : 1)) || []
      )
    },
    thePresentation() {
      if (this.filteredPresentations.length > 1) {
        console.log(
          'check if we have dates, to see if the sorting is correct: ',
          this.filteredPresentations.map((n) => n.meeting.date)
        )
      }
      return this.filteredPresentations[0]
    },
    dateLastNoted() {
      return this.thePresentation?.meeting?.date || 'Not Yet Noted'
    },
    completion() {
      return this.thePresentation?.completeness || 'Incomplete'
    },
    progress() {
      return this.thePresentation?.grade || 'Not started'
    },
    styleClass() {
      return this.thePresentation ? 'found' : 'missing'
    },
  },
  apollo: {
    presentations: {
      prefetch: true,
      query: presentationByIndicatorQuery,
      variables() {
        //   the focusArea should be passed to the page via route?
        return { indicator: this.content.id }
      },
    },
  },
}
</script>

<style scoped>
.card-board {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}
.label {
  flex: 0 0 50%;
}

.found,
.missing {
  flex: 0 0 50%;
}
.found {
  color: black;
}
.missing {
  color: red;
}
</style>
