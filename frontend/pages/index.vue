<template>
  <div class="container">
    <div>
      <img src="~/assets/wps-logo.png" alt="Willetton Primary School Logo" />
      <h1 class="title">Business Plan KPIs</h1>
      <p class="description">
        A summary of Strategies for Improvement, Measuring Success and
        Performance Targets along with indicators showing progress towards
        achieving the Business Plan's goals
      </p>
      <div class="links">
        <p>View Business Plan Strategies, Measurements and Targets</p>
        <nuxt-link
          v-for="area in businessPlanInfo"
          :key="area.to"
          class="button--grey"
          :to="{
            name: 'business-plan',
            params: {
              selection: area.name,
            },
          }"
        >
          {{ area.name }}
        </nuxt-link>
        <p>View Indicators by Category:</p>
        <nuxt-link
          v-for="area in drivers"
          :key="area.to"
          :to="{
            name: 'indicators',
            params: {
              focusArea: area.display,
            },
          }"
          class="button--grey"
        >
          {{ area.display }}
        </nuxt-link>
        <p>View Upcoming Indicators:</p>
        <nuxt-link to="test" class="button--grey"
          >Upcoming Indicators</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import focusAreasQuery from '~/apollo/queries/focusAreas/focusAreas'
import businessPlanInfo from '~/assets/businessPlanInfo.json'
export default {
  data() {
    return {
      drivers: [],
      businessPlanInfo,
    }
  },
  apollo: {
    drivers: {
      prefetch: true,
      query: focusAreasQuery,
    },
  },
}
</script>

<style>
body {
  background: #f6782b;
  text-align: center;
  font-size: 16pt;
  min-height: 100vh;
}
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3rem;
  color: #fefefe;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 2rem;
  color: #333333;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
