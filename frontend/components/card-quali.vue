<template>
  <div v-if="content.type == 'Qualitative'" class="qualitative">
    <ul>
      <li
        v-for="(item, i) in content.stepsToSuccess"
        :key="content.name + 'step' + i"
      >
        <span class="emoji">{{ status(item[1]) }}</span>
        <span class="step-text">{{ item[0] }}</span>
      </li>
    </ul>
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
    status(color) {
      switch (color) {
        case 'green':
          return '✔️'
        case 'orange':
          return '🔶'
        case 'red':
          return '🔴'
        default:
          return '0'
      }
    },
  },
}
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li .emoji {
  padding-right: 1rem;
}
</style>
