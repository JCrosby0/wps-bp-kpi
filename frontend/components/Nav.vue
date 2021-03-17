<template>
  <div class="component">
    <div class="nav">
      <nuxt-link class="logo" to="/">
        <img src="~/assets/wps-logo.png" alt="Willetton Primary School Logo" />
      </nuxt-link>
      <div class="title">Business Plan KPIs</div>
      <div class="links" @click="showMenu = !showMenu"></div>
    </div>
    <transition name="slide-fade">
      <div v-if="showMenu">
        <div class="menu">
          <p>View Business Plan Strategies, Measurements and Targets</p>
          <nuxt-link
            v-for="area in businessPlanInfo"
            :key="area.to"
            class="button--orange"
            :to="{
              name: 'business-plan-slug',
              params: {
                slug: area.name,
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
            class="button--orange"
          >
            {{ area.display }}
          </nuxt-link>
          <p>View Upcoming Indicators:</p>
          <nuxt-link
            :to="{
              name: 'upcoming',
              params: {},
            }"
            class="button--orange"
            >Upcoming Indicators</nuxt-link
          >
          <p>View Progress Summary:</p>
          <nuxt-link
            :to="{
              name: 'progress',
              params: {},
            }"
            class="button--orange"
            >Progress Summary</nuxt-link
          >
          <p>View Indicator History:</p>
          <nuxt-link
            :to="{
              name: 'history',
              params: {},
            }"
            class="button--orange"
            >Historical Data</nuxt-link
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import focusAreasQuery from '~/apollo/queries/focusAreas/focusAreas'
import businessPlanInfo from '~/assets/businessPlanInfo.json'
export default {
  data() {
    return {
      showMenu: false,
      businessPlanInfo,
    }
  },
  watch: {
    $route() {
      this.showMenu = false
    },
  },
  apollo: {
    drivers: {
      prefetch: true,
      query: focusAreasQuery,
    },
  },
}
</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column;
  width: 100vw;
}
.nav {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  z-index: 2;
  background: var(--color-orange);
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
}
.logo,
.links {
  flex: 0 0 auto;
}
.title {
  flex: 1 1 auto;
  font-family: Lato, 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 3rem;
  line-height: 55px;
  color: black;
  letter-spacing: 3px;
}

.links {
  padding: 1rem;
  background: var(--color-grey);
  border: 1px black solid;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.links:before {
  content: '\2630';
}
.menu {
  background: var(--color-grey);
  padding: 1rem;
  color: #ccc;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  z-index: 1;
  overflow-y: auto;
  max-height: calc(100vh - 132px);
}

@media only screen and (max-width: 550px) {
  .title {
    display: none;
  }
}
</style>
