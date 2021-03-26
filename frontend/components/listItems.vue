<template>
  <ul>
    <li
      v-for="(focusArea, i) in data.map((n) => n.focus_area).filter(onlyUnique)"
      :key="'display-key-' + i"
      class="focus-area"
    >
      <span>{{ focusArea }}</span>
      <!-- Value // Filter to relevant focusArea -->
      <ul>
        <li
          v-for="(val, j) in data.filter((n) => n.focus_area === focusArea)"
          :key="`display-key-${i}-value-${j}`"
          class="item"
        >
          <span v-if="true">{{ emoji[val.category] }} </span>
          <span>{{ val.value }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
// when iterating, only return true if its the first instance of a value
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}
export default {
  props: {
    data: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      emoji: {
        Strategy: '✍️',
        Measurement: '📏',
        Target: '🎯',
      },
    }
  },
  methods: {
    onlyUnique(v, i, s) {
      return onlyUnique(v, i, s)
    },
  },
}
</script>
<style scoped>
li.focus-area {
  font-size: 1.2rem;
}
li.item {
  font-size: 1rem;
  list-style-type: none;
}

ul {
  padding-left: 1rem;
}
</style>
