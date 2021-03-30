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
    <tbody></tbody>
    <tr v-for="(row, r) in data" :key="row.date">
      <td v-for="(col, c) in headers" :key="`r${r}c${c}`" :class="col.align">
        {{ row[col.key] }}
      </td>
      <td class="center">
        <button class="button--grey" @click="$emit('meeting', row)">
          View Meeting
        </button>
      </td>
    </tr>
  </table>
</template>
<script>
const tableHeadings = [
  {
    display: 'Date',
    key: 'date',
    width: '100px',
    align: 'left',
  },
  {
    display: 'Term',
    key: 'term',
    width: false,
    align: 'center',
  },
  {
    display: 'Week',
    key: 'week',
    width: false,
    align: 'center',
  },
  {
    display: 'Year',
    key: 'year',
    width: false,
    align: 'center',
  },
  {
    display: 'Presentations',
    key: 'presentations',
    width: 'fill',
    align: 'center',
  },
]
export default {
  props: {
    data: {
      required: true,
      type: Array,
      default: () => [],
    },
    headers: {
      required: false,
      type: Array,
      default: () => tableHeadings,
    },
  },
}
</script>
