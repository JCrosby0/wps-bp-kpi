<template>
  <div>
    <Spinner></Spinner><br />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import Spinner from '~/components/spinner'
export default {
  components: { Spinner },
  data() {
    return {
      message: 'Retrieving data...',
    }
  },
  mounted() {
    setTimeout(() => {
      console.log('data taking a while...')
      this.message =
        'Looks like the server is spinning up. This may take about 30seconds.'
    }, 5000)
    setTimeout(() => {
      console.log('server should be ready')
      this.message =
        "The server should be ready by now. Let's try refreshing the page..."
    }, 30000)
  },
}
</script>

<style></style>
