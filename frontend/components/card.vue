<template>
  <div class="card">
    <div class="header">
      <h3>{{ content.name }}</h3>
    </div>
    <div class="body">
      <div v-show="activeTab === 0" class="tab-info">
        <p>
          Focal Point: {{ content.focalPoint }}<br />
          Target Date:
          {{ content.dateAvailable }}
        </p>
      </div>
      <div v-show="activeTab === 1" class="tab-metrics">
        <h5>Associated Items:</h5>
        <h6>Measuring Success</h6>
        <div v-for="item1 in content.measuring_successes" :key="item1.value">
          <span>{{ item1.value }}</span>
        </div>
        <h6>Performance Targets</h6>
        <div v-for="item1 in content.performance_targets" :key="item1.value">
          <span> {{ item1.value }} </span>
        </div>
        <h6>Strategies for Improvement</h6>
        <div
          v-for="item1 in content.strategies_for_improvements"
          :key="item1.value"
        >
          <span> {{ item1.value }} </span>
        </div>
      </div>
      <div v-show="activeTab === 2" class="tab-results">
        <div v-if="content.type == 'Qualitative'" class="qualitative">
          <!-- text and stuff -->
          <h5>Progress:</h5>
          <ol>
            <li
              v-for="(item, i) in content.stepsToSuccess"
              :key="content.name + 'step' + i"
            >
              {{ item }}
            </li>
          </ol>
        </div>
        <div v-else-if="content.type == 'Quantitative'" class="quantitative">
          <p>
            Result:<br />
            [{{ content.rangeLow }}] {{ content.value }} /
            {{ content.target }} [{{ content.rangeHigh }}]
          </p>
          <!-- numbers and stuff -->
        </div>
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
export default {
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
  border: 1px grey solid;
  border-radius: 1rem;
  background: #efefef;
  text-align: left;
  margin: 0.5rem;
}
.header {
  padding: 1rem;
}
.body {
  padding: 1rem;
}
.footer {
}

.tabs {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.tab {
  border: 1px grey solid;
  background: #cdcdcd;
  width: 100%;
  height: 100%;
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
  border-bottom-left-radius: 1rem;
  border-left: none;
}
.tab:last-of-type {
  border-bottom-right-radius: 1rem;
  border-right: none;
}
</style>
