<template>
  <table v-if="data">
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
          <span v-if="col.key === 'indicator'">{{ row.indicator.name }}</span>
          <div
            v-else-if="['completeness', 'grade'].includes(col.key)"
            :class="classify(row[col.key])"
          >
            {{ transform(row[col.key]) }}
          </div>
          <span v-else>{{ row[col.key] }}</span>
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
  methods: {
    classify(value) {
      switch (value) {
        case 'ONGOING':
        case 'COMPLETE':
        case 'ACHIEVE':
        case 'EXCEED':
          return 'badge green'
        case 'PARTIAL':
        case 'INPROGRESS':
          return 'badge orange'
        case 'NOTSTARTED':
        case 'FAIL':
          return 'badge red'
        case 'UNKNOWN':
          return 'badge grey'
      }
    },
    transform(value) {
      const dict = {
        NOTSTARTED: 'Not Started',
        INPROGRESS: 'In Progress',
      }
      if (Object.keys(dict).includes(value)) {
        value = dict[value]
      }
      return value.toLowerCase()
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
table table tbody:nth-of-type(even) tr {
  background: #eee;
}
td,
th {
  padding: 0.25rem 0.5rem;
}
table button {
  width: 160px;
  padding: 0.5rem;
}
table table button {
  width: auto;
}
table table td {
  vertical-align: top;
}
td.full {
  padding: 0;
}
.expanded {
  background: var(--color-orange);
  outline: 1px grey solid;
}
.clickable {
  cursor: pointer;
}
.clickable:hover {
  background: var(--color-light-orange);
  border: 1px grey solid;
}

.badge {
  border: 1px grey solid;
  padding: 0.5rem;
  height: 34px;
  width: 90px;
  font-size: 0.75rem;
  text-align: center;
  margin: auto;
  text-transform: capitalize;
  border-radius: 0.25rem;
}
.green {
  background: green;
  color: white;
}
.orange {
  background: orange;
}
.red {
  background: red;
}
.grey {
  background: lightgray;
}
</style>
