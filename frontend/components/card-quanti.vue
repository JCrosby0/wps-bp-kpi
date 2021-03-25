<template>
  <div class="jcg-container">
    <div class="jcg-gauge"></div>
    <div
      class="jcg-target-indicator"
      :style="{
        '--target-rotation': needleRotation(
          content.rangeLow,
          content.rangeHigh,
          content.target
        ),
      }"
    ></div>
    <div
      v-show="content.value"
      class="jcg-needle"
      :style="{
        '--needle-rotation': needleRotation(
          content.rangeLow,
          content.rangeHigh,
          content.value
        ),
      }"
    ></div>
    <div class="jcg-value">Value: {{ content.value }}</div>
    <div class="jcg-target">Target: {{ content.target }}</div>
    <div class="jcg-low">{{ content.rangeLow }}</div>
    <div class="jcg-high">{{ content.rangeHigh }}</div>
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
  methods: {
    needleRotation(low, high, value) {
      const normalised = (value - low) / (high - low)
      const degrees = 90 * parseFloat(normalised) - 45
      return `${parseInt(degrees)}deg`
    },
  },
}
</script>
<style scoped>
.jcg-container {
  position: relative;
  margin: auto;
  width: 200px;
  height: 100px;
  pointer-events: none;
  /* border: 1px black solid; */
}
.jcg-gauge {
  position: absolute;
  border: 30px transparent solid;
  border-top: 30px grey solid;
  border-radius: 50%;
  height: 150px;
  width: 200px;
  top: 0;
  left: calc(50% - 100px);
}
.jcg-needle {
  width: 5px;
  border-bottom: 100px orange solid;
  border-left: 5px transparent solid;
  border-right: 5px transparent solid;
  position: absolute;
  bottom: 5px;
  left: calc(50% - 2.5px);
  transform: rotate(var(--needle-rotation));
  transform-origin: bottom;
}
.jcg-target-indicator {
  width: 1px;
  height: 40px;
  position: absolute;
  border: 1px red dashed;
  bottom: 5px;
  left: calc(50%);
  transform: rotate(var(--target-rotation)) translateY(-60px);
  transform-origin: bottom;
}
.jcg-target {
  position: absolute;
  text-decoration: underline 4px red dashed;
  text-underline-offset: 2px;
  bottom: 0;
  left: 0;
}
.jcg-value {
  position: absolute;
  text-decoration: underline 4px orange solid;
  text-underline-offset: 2px;
  bottom: 0;
  right: 0;
}
.jcg-low {
  position: absolute;
  top: calc(50% - 1.5rem);
  left: 0.5rem;
  text-align: left;
}
.jcg-high {
  position: absolute;
  top: calc(50% - 1.5rem);
  right: 0.5rem;
  text-align: right;
}
</style>
