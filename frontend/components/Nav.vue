<template>
  <div class="component">
    <div class="nav">
      <nuxt-link class="logo" to="/">
        <img
          src="~/assets/wps-logo.png"
          alt="Willetton Primary School Logo"
          height="60px"
        />
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
            :to="{
              name: 'business-plan-category',
              params: {
                category: area.name,
              },
            }"
            class="button--orange"
          >
            {{ area.name }}
          </nuxt-link>
          <p>View Indicators by Category:</p>
          <nuxt-link
            v-for="area in drivers"
            :key="area.to"
            :to="{
              name: 'indicators-focusArea',
              params: {
                focusArea: area.display,
              },
            }"
            class="button--orange"
          >
            {{ area.display }}
          </nuxt-link>
          <p>View Indicators by Date:</p>
          <nuxt-link
            v-for="link in upcomingIndicators"
            :key="link.display"
            :to="{
              name: 'indicators-date-upcoming',
              params: {
                dateStart: link.dateStart,
                dateEnd: link.dateEnd,
                upcoming: link.display,
              },
            }"
            class="button--orange"
            >{{ link.display }}</nuxt-link
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
      upcomingIndicators: [
        {
          display: 'Last year',
          dateStart: this.getDateTime(-1),
          dateEnd: this.getDateTime(),
        },
        {
          display: 'Last 3 months',
          dateStart: this.getDateTime(0, -3),
          dateEnd: this.getDateTime(),
        },
        {
          display: 'This Year',
          dateStart: '2021-01-01',
          dateEnd: '2021-12-31',
        },
        {
          display: 'Next 3 months',
          dateStart: this.getDateTime(),
          dateEnd: this.getDateTime(0, 3),
        },
        {
          display: 'Next Year',
          dateStart: this.getDateTime(),
          dateEnd: this.getDateTime(1),
        },
      ],
    }
  },
  watch: {
    $route() {
      this.showMenu = false
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
  background: repeating-conic-gradient(
    from 3deg at 15rem 15rem,
    hsl(30, 100%, 57.5%) 0deg 15deg,
    hsl(30, 100%, 55%) 10deg 30deg
  );
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
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  line-height: 1rem;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.3);
}
.links:before {
  content: '\2630';
  margin: auto;
}
.links:hover {
  background: #cccccc;
  transition: 0.3s;
  color: var(--color-grey);
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
