<template>
  <div class="card-board">
    <div class="label">Date Last Noted:</div>
    <div class="value">{{ dateNoted }}</div>
    <div class="label">Completion:</div>
    <div class="value">{{ complete }}</div>
    <div class="label">Progress:</div>
    <div class="value">{{ progress }}</div>
  </div>
</template>

<script>
export default {
  props: {
    dateNoted: {
      type: String,
      required: false,
      default: () => 'Not yet noted',
    },
    complete: {
      type: String,
      required: false,
      default: () => 'Not complete',
    },
    progress: {
      type: String,
      required: false,
      default: () => 'Not yet started',
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
}
</style>
