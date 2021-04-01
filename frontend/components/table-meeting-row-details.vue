<template>
  <div class="background">
    <div class="meeting-date">
      <span>Week {{ data.week }} Term {{ data.term }} {{ data.year }}</span>
    </div>
    <div v-if="!data.presentations.length" class="presentations">
      There were no presentations at this meeting
    </div>
    <div v-else class="presentations">
      <Table
        :key="'presentation' + data.id"
        :data="data.presentations"
        header-key="presentations"
      >
        <template #actions>
          <button>TODO: Update</button>
          <button>TODO: Delete</button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import Table from '~/components/table-meetings'
export default {
  components: { Table },
  props: {
    data: {
      required: true,
      type: Object,
    },
  },
}
</script>

<style scoped>
.background {
  background: #fefefe;
  padding: 1rem;
  border: 1px grey solid;
}
</style>
