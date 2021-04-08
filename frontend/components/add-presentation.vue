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
        <label for="indicatorName" class="label required">Indicator:</label>
        <select
          v-if="!$apolloData.loading"
          v-model="form.indicator"
          name="indicatorName"
          class="value"
        >
          <option v-for="ind in indicators" :key="ind.id" :value="ind">
            {{ ind.name }}
          </option>
        </select>
        <!-- placeholder input box so that it doesn't appear from nowhere when indicators are available -->
        <select
          v-else
          :value="form.indicator"
          name="indicatorName"
          class="value"
        ></select>
      </div>
      <div class="row">
        <label for="completeness" class="label">Completeness:</label>
        <select
          id="completeness"
          v-model="form.completeness"
          name="progress"
          class="value"
        >
          <option value="UNKNOWN">Unknown</option>
          <option value="NOTSTARTED">Not Yet Started</option>
          <option value="INPROGRESS">In Progress</option>
          <option value="ONGOING">On going</option>
          <option value="COMPLETE">Complete</option>
        </select>
      </div>
      <div class="row">
        <label for="grade" class="label">Grade:</label>
        <select id="grade" v-model="form.grade" name="grade" class="value">
          <option value="UNKNOWN">Unknown</option>
          <option value="EXCEED">Exceed</option>
          <option value="ACHIEVE">Achieve</option>
          <option value="PARTIAL">Partial</option>
          <option value="FAIL">Fail</option>
        </select>
      </div>
    </form>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
import indicatorsName from '~/apollo/queries/indicators/indicatorsName'
export default {
  props: {
    presentationIndex: {
      required: false,
      type: Number || null,
      default: () => {
        return null
      },
    },
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
      message: '* Required Fields',
      defaultMessage: '* Required Fields',
      form: {
        presenter: null,
        comments: null,
        indicator: null,
        completeness: null,
        grade: null,
      },
    }
  },
  // computed: {
  //   theForm() {
  //     return document.getElementById('formAddpresentation')
  //   },
  // },
  mounted() {
    if (this.presentationIndex === null) return
    const pres = this.data.presentations[this.presentationIndex]
    Object.keys(pres).forEach((key) => {
      if (key === 'indicator') {
        this.form.indicator = pres.indicator
      } else {
        this.form[key] = pres[key]
      }
    })
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
  flex: 0 0 7rem;
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
.message {
  color: red;
  padding-left: 7rem;
}
.required::before {
  content: '*';
  color: red;
}
</style>
