<template>
  <div>
    <div class="row">
      <div class="label">Meeting</div>
      <div class="value">
        Term {{ data.term }} Week {{ data.week }}, {{ data.year }}
      </div>
    </div>
    <form id="formAddPresentation" ref="theForm">
      <div class="row">
        <label for="presenter" class="label">Presenter:</label>
        <input v-model="form.presenter" name="presenter" class="value" />
      </div>
      <div class="row">
        <label for="comments" class="label">Comments:</label>
        <textarea v-model="form.comments" name="comments" class="value" />
      </div>
      <!-- <div
        v-for="(ind, j) in pres.indicator"
        :key="`pres-${i}-ind-${j}`"
        class="indicators"
      > -->
      <div class="row">
        <label for="indicatorName" class="label">Indicator:</label>
        <select
          v-if="!$apolloData.loading"
          v-model="form.indicator.id"
          name="indicatorName"
          class="value"
        >
          <option v-for="ind in indicators" :key="ind.id" :value="ind.id">
            {{ ind.name }}
          </option>
        </select>
        <!-- placeholder input box so that it doesn't appear from nowhere when indicators are available -->
        <select
          v-else
          v-model="form.indicator.name"
          name="indicatorName"
          class="value"
        ></select>
      </div>
      <div class="row">
        <label for="progress" class="label">Progress:</label>
        <select
          id="progress"
          v-model="form.progressAchieved"
          name="progress"
          class="value"
        >
          <option value="NOTYETSTARTED">Not Yet Started</option>
          <option value="INPROGRESS">In Progress</option>
          <option value="ONGOING">On going</option>
          <option value="COMPLETE">Complete</option>
        </select>
      </div>
      <div class="row">
        <label for="status" class="label">Quality:</label>
        <!-- <input v-model="pres.progressStatus" class="value" /> -->
        <select
          id="progress"
          v-model="form.progressStatus"
          name="status"
          class="value"
        >
          <option value="UNKNOWN">Unknown</option>
          <option value="EXCEED">Exceed</option>
          <option value="ACHIEVE">Achieve</option>
          <option value="FAIL">Fail</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
import indicatorsName from '~/apollo/queries/indicators/indicatorsName'
export default {
  props: {
    data: {
      required: true,
      type: Object,
      default: () => {
        return {
          date: '1234-12-12',
          year: 2021,
          term: 1,
          week: 14,
          presentations: [
            {
              presenter: 'Test',
              comments: 'Some comments about the meeting',
              indicator: ['name1', 'name2'],
            },
          ],
        }
      },
    },
  },
  data() {
    return {
      form: {
        presenter: null,
        comments: null,
        indicator: { id: null },
        progressStatus: null,
        progressAchieved: null,
      },
    }
  },
  computed: {
    theForm() {
      return document.getElementById('formAddpresentation')
    },
  },
  methods: {
    sortByKey(a, b, key) {
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
    },
  },
  apollo: {
    indicators: {
      prefetch: true,
      query: indicatorsName,
      result({ data }) {
        data.indicators = data.indicators.sort((a, b) =>
          this.sortByKey(a, b, 'name')
        )
        return data
      },
    },
  },
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.label {
  flex: 0 0 6rem;
  padding: 0.5rem 0;
}
.value {
  flex: 1 1 auto;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
}
textarea {
  height: 150px;
}
select#progress {
  width: 100%;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
}
option {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.2rem;
}
.center {
  margin: auto;
}
.right {
  text-align: right;
}
.add-presentation {
  background: #ccffcc;
  font-size: 2rem;
  line-height: 2.8rem;
  width: 3rem;
  height: 3rem;
  margin-left: auto;
}
</style>
