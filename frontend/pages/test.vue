<template>
  <div class="container">
    {{ category }}
    <Card :content="{ value: 'hello world' }" />
  </div>
</template>

<script>
import Card from '~/components/card'
import indicatorsQuery from '~/apollo/queries/indicators/indicators'
export default {
  components: [Card],
  props: {
    category: {
      required: false,
      type: String,
      default: () => 'Category',
    },
  },
  apollo: {
    drivers: {
      prefetch: true,
      query: indicatorsQuery,
      variables() {
        return { id: parseInt(this.$route.params.id) }
      },
    },
  },
}
</script>

<style></style>
