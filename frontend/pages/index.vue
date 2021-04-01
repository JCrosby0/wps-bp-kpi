<template>
  <div class="container">
    <div class="main center">
      <p class="description">
        This portal provides a queriable summary of Strategies for Improvement,
        Success Measurements and Performance Targets along with indicators
        showing progress towards achieving the Business Plan's goals
      </p>
      <Dashboard></Dashboard>
      <p class="notification">
        Please note: the server sleeps when idle, and may take up to 20 seconds
        to respond when waking up. Please be patient!
      </p>
      <div class="left">
        <h6>Known Issues:</h6>
        <ul>
          <li>
            Refreshing a page may display a page not found error. Go back to
            wps-bp-kpi.netlify.app and Use the menu to navigate back to the
            desired page.
          </li>
          <li>
            Emails are not currently being sent out when with account
            registration validation or password reset requests. Contact Joe for
            manual account validation.
          </li>
        </ul>
        <h6>Planned Features:</h6>
        <ul>
          <li>View Indicators by latest update</li>
          <li>
            Add additional tab to indicators: evidence (links to supporting /
            relevant activities)
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <p class="center">Created by Crosby Solutions, 2021</p>
    </div>
  </div>
</template>
<script>
import Dashboard from '~/components/Dashboard'
export default {
  components: {
    Dashboard,
  },
}
</script>
<style scoped>
.main {
  padding: 1rem;
  flex: 1 0 calc(100% - 1rem);
}
.footer {
  flex: 0 0 1rem;
  font-size: 0.8rem;
}
.description {
  background: black;
  padding: 1rem;
  border: 1px grey solid;
  color: #efefef;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
.subtitle {
  font-weight: 300;
  font-size: 1.5rem;
  color: #333333;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.notification {
  padding: 1rem;
}

@media only screen and (max-width: 550px) {
  .description {
    font-size: 0.8rem;
  }
}
</style>
