<template>
  <div class="card">
    <div class="header">
      <h3>{{ content.name }}</h3>
    </div>
    <div class="body">
      <div v-show="activeTab === 0" class="tab-info">
        <p>
          🙋 {{ content.focalPoint }}<br />
          📆
          {{ content.dateAvailable }}
        </p>
        <br />
        <p>
          {{ content.description }}
        </p>
      </div>
      <div v-show="activeTab === 1" class="tab-metrics">
        <CardMetrics :content="content"></CardMetrics>
      </div>
      <div v-show="activeTab === 2" class="tab-results">
        <div class="title">Board Review:</div>
        <CardBoard :content="content" /><br />
        <div class="title">Summary:</div>
        <CardQuali
          v-if="content.type == 'Qualitative'"
          class="qualitative"
          :content="content"
        >
        </CardQuali>
        <CardQuanti
          v-else-if="content.type == 'Quantitative'"
          class="quantitative"
          :content="content"
        >
          <!-- numbers and stuff -->
        </CardQuanti>
      </div>
    </div>
    <div class="footer">
      <div class="tabs">
        <div
          v-for="(tab, i) in tabs"
          :key="'tab' + i"
          :class="{ tab: true, 'tab-active': i === activeTab }"
          @click="activeTab = i"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>
    <!-- {{ content }} -->
  </div>
</template>

<script>
import CardQuali from '~/components/card-quali'
import CardQuanti from '~/components/card-quanti'
import CardMetrics from '~/components/card-metrics'
import CardBoard from '~/components/card-board'
export default {
  components: { CardQuali, CardQuanti, CardMetrics, CardBoard },
  props: {
    content: {
      required: true,
      type: Object,
      default: () => {
        return {
          value: 'Placeholder',
        }
      },
    },
  },
  data: () => {
    return {
      activeTab: 0,
      tabs: [{ name: 'Info' }, { name: 'Metrics' }, { name: 'Results' }],
    }
  },
}
</script>
<style scoped>
.card {
  border: 2px var(--color-grey) solid;
  /* border-radius: 1rem; */
  background: #efefef;
  text-align: left;
  margin: 0.5rem;
  display: flex;
  width: 300px;
  height: 400px;
  flex-direction: column;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
}
.header {
  padding: 1rem;
  background: var(--color-orange);
  /* border-radius: 0.9rem 0.9rem 0 0; */
  flex: 0 0 50px;
  box-sizing: border-box;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
}
.header h3 {
  margin-bottom: 0;
}
.header h6 {
  margin: 20px 0;
}
.body {
  padding: 1rem;
  overflow: auto;
  flex: 1 0 150px;
}
.footer {
  flex: 0 0 33px;
}

.tabs {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.tab {
  flex: 1 1 auto;
  border: 1px grey solid;
  background: #cdcdcd;
  width: 100%;
  /* height: 41px; */
  text-align: center;
  padding: 0.5rem;
  border-bottom: none;
  cursor: pointer;
}
.tab-active {
  background: #efefef;
  border-top: none;
}
.tab:first-of-type {
  /* border-bottom-left-radius: 1rem; */
  border-left: none;
}
.tab:last-of-type {
  /* border-bottom-right-radius: 1rem; */
  border-right: none;
}
.tab-results {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  height: 100%;
  overflow: hidden;
}
.title {
  text-decoration: underline;
}
</style>
