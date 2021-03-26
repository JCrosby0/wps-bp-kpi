<template>
  <div>
    <div class="indicators">
      <h1>Indicators by Date</h1>
      <div class="inputs-box">
        <div class="input-group">
          <div class="input-label">
            <label for="dateStart">Start Date</label>
          </div>
          <input v-model="dateStart" type="date" name="dateStart" />
        </div>
        <div class="input-group">
          <div class="input-label">
            <label for="dateEnd">End Date</label>
          </div>
          <input v-model="dateEnd" type="date" name="dateEnd" />
        </div>
      </div>
      <div v-if="!indicators"><Spinner /><br />Retrieving data...</div>
      <div class="arrange-cards">
        <Card
          v-for="(ind, i) in indicators"
          :key="'indicator-' + i"
          :content="ind"
        />
        <div v-if="indicators && !indicators.length">
          There are no indicators matching this date range.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '~/components/card'
import upcomingQuery from '~/apollo/queries/indicators/indicatorsByDate'
import Spinner from '~/components/spinner'
export default {
  components: { Card, Spinner },
  props: {
    category: {
      required: false,
      type: String,
      default: () => 'Category',
    },
  },
  data() {
    return {
      dateStart: this.$route.params.dateStart || this.getDateTime(),
      dateEnd: this.$route.params.dateEnd || this.getDateTime(0, 6),
    }
  },
  computed: {
    dateTimeStart() {
      return this.dateStart + 'T00:00:00Z'
    },
    dateTimeEnd() {
      return this.dateEnd + 'T00:00:00Z'
    },
    focusArea() {
      return this.$route.params.focusArea
    },
  },
  methods: {
    getDateTime(y = 0, m = 0) {
      const now = new Date()
      let year = now.getFullYear() + y
      let month = now.getMonth() + 1 + m
      let day = now.getDate()
      while (month < 1) {
        month += 12
        year -= 1
      }
      if (month.toString().length === 1) {
        month = '0' + month
      }
      if (day.toString().length === 1) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },
  },
  apollo: {
    indicators: {
      prefetch: false,
      query: upcomingQuery,
      variables() {
        //   the focusArea should be passed to the page via route?
        return { dateStart: this.dateTimeStart, dateEnd: this.dateTimeEnd }
      },
    },
  },
}
</script>

<style scoped>
.indicators {
  display: flex;
  height: 100%;
  padding: 1rem;
  flex-direction: column;
  align-content: flex-start;
}
.arrange-cards {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.inputs-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 1rem 1rem;
}
.input-label {
  width: 100px;
}
label {
  text-align: right;
  padding-right: 1rem;
}
.input-group input {
  width: calc(100% - 110px);
}
.input-group {
  flex: 1 0 250px;
  display: flex;
  flex-direction: row;
}
</style>
