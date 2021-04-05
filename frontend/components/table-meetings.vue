<template>
  <table v-if="data" id="meetings">
    <thead>
      <tr>
        <th
          v-for="th in headers"
          :key="th.display"
          :width="th.width"
          :class="th.align"
        >
          {{ th.display }}
        </th>
        <th class="center">Actions</th>
      </tr>
    </thead>
    <tbody v-for="(row, r) in data" :key="row.date">
      <tr
        :class="{
          clickable: headerKey === 'meetings',
          expanded: meetingId && meetingId == row.id,
        }"
        @click="$emit('rowSelect', row)"
      >
        <td v-for="(col, c) in headers" :key="`r${r}c${c}`" :class="col.align">
          {{ col.key === 'indicator' ? row.indicator.name : row[col.key] }}
        </td>
        <td class="center">
          <slot name="actions" :index="r" :row="row"></slot>
        </td>
      </tr>
      <!-- this logic is for which row to expand.
      TODO: Could make it generic? -->
      <tr v-if="meetingId && meetingId == row.id">
        <td colspan="999" class="full">
          <slot ref="detailsSlot" name="details" :row="row">
            Details go here...
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import tableSpecs from '~/assets/tableSpecs.json'
export default {
  props: {
    data: {
      required: true,
      type: Array,
      default: () => [],
    },
    headerKey: {
      required: true,
      type: String,
    },
    meetingId: {
      required: false,
      type: String || null,
      default: () => null,
    },
    meeting: {
      required: false,
      type: Object || null,
      default: () => null,
    },
  },
  computed: {
    headers() {
      return tableSpecs[this.headerKey]
    },
  },
}
</script>
<style scoped>
table {
  width: 100%;
  border-spacing: 0;
  /* border-collapse: collapse; */
}

td,
th {
  padding: 0.25rem 0.5rem;
}
td.full {
  padding: 0;
}
.expanded {
  background: var(--color-orange);
  border: 1px grey solid;
}
.clickable {
  cursor: pointer;
}
.clickable:hover {
  background: var(--color-light-orange);
  border: 1px grey solid;
}
</style>
