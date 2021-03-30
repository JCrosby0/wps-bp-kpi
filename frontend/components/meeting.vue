<template>
  <div>
    <div class="row">
      <div class="label">Meeting</div>
      <div class="value">
        Term {{ data.term }} Week {{ data.week }}, {{ data.year }}
      </div>
    </div>
    <div v-if="!data.presentations.length" class="none">
      There are no presentations for this meeting.
    </div>
    <div v-for="(pres, i) in data.presentations" :key="'presentation-' + i">
      <div class="row">
        <div class="label">Presenter:</div>
        <input v-model="pres.Presenter" class="value" />
      </div>
      <div class="row">
        <div class="label">Comments:</div>
        <input v-model="pres.Comments" class="value" />
      </div>
      <!-- <div
        v-for="(ind, j) in pres.indicator"
        :key="`pres-${i}-ind-${j}`"
        class="indicators"
      > -->
      <div class="row">
        <div class="label">Indicator:</div>
        <input v-model="pres.indicator.name" class="value" />
      </div>
      <div class="row">
        <div class="label">Progress:</div>
        <select
          id="progress"
          v-model="pres.progressAchieved"
          name="progress"
          class="value"
        >
          <option value="NotYetStarted">Not Yet Started</option>
          <option value="InProgress">In Progress</option>
          <option value="Ongong">Ongoing</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      <div class="row">
        <div class="label">Achieved:</div>
        <!-- <input v-model="pres.progressStatus" class="value" /> -->
        <select
          id="progress"
          v-model="pres.progressStatus"
          name="progress"
          class="value"
        >
          <option value="Exceed">Exceed</option>
          <option value="Achieve">Achieve</option>
          <option value="Fail">Fail</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
      <!-- </div> -->
      <hr width="80%" class="center" />
    </div>
    <div class="right">
      <button
        title="Add Presentation"
        class="add-presentation"
        @click="$emit('addPresentation')"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
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
              Presenter: 'Test',
              Comments: 'Some comments about the meeting',
              indicator: ['name1', 'name2'],
            },
          ],
        }
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
