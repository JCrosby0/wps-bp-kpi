<template>
  <div class="card-board">
    <div class="label">Date Last Noted:</div>
    <div class="value">{{ content.boardDateLastNoted || 'Not yet noted' }}</div>
    <div class="label">Completion:</div>
    <div class="value">{{ content.boardStatusAchieved || 'Incomplete' }}</div>
    <div class="label">Progress:</div>
    <div class="value">{{ content.boardStatusProgress || 'Not started' }}</div>
  </div>
</template>

<script>
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
.value {
  flex: 0 0 50%;
  color: red;
}
</style>
