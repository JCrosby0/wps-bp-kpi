<template>
  <div>
    <h5>Associated Items:</h5>
    <h6 v-show="content.measuring_successes.length">Measuring Success</h6>
    <div v-for="item1 in content.measuring_successes" :key="item1.value">
      <span>- {{ item1.value }}</span>
    </div>
    <h6 v-show="content.performance_targets.length">Performance Targets</h6>
    <div v-for="item1 in content.performance_targets" :key="item1.value">
      <span>- {{ item1.value }} </span>
    </div>
    <h6 v-show="content.strategies_for_improvements.length">
      Strategies for Improvement
    </h6>
    <div
      v-for="item1 in content.strategies_for_improvements"
      :key="item1.value"
    >
      <span>- {{ item1.value }} </span>
    </div>
    <span
      v-show="
        content.measuring_successes.length +
          content.performance_targets.length +
          content.strategies_for_improvements.length ==
        0
      "
      >There are no associated items</span
    >
  </div>
</template>
<script>
export default {
  props: {
    content: {
      required: true,
      type: Object,
      default: () => {
        return {
          value: 'Placeholder',
        }
      },
    },
  },
}
</script>
<style scoped>
.header h6 {
  margin: 20px 0;
}
</style>
