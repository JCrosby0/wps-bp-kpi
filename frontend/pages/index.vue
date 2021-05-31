<template>
  <div class="container">
    <div class="main center">
      <h1>Dashboard:</h1>
      <p class="description">
        This portal provides a queriable summary of Strategies for Improvement,
        Success Measurements and Performance Targets along with indicators
        showing progress towards achieving the Business Plan's goals
      </p>
      <Dashboard></Dashboard>
      <div class="left">
        <h2>Known Issues:</h2>
        <ul>
          <li>
            Refreshing a page may display a page not found error. Go back to
            wps-bp-kpi.netlify.app and Use the menu to navigate back to the
            desired page.
          </li>
          <li>
            Refreshing an Indicators by date page causes the date range
            calculation to fail. Navigate to a different date range and back to
            reset.
          </li>
          <li>
            Emails are not currently being sent out when with account
            registration validation or password reset requests. Contact Joe for
            manual account validation.
          </li>
        </ul>
        <h2>Planned Features:</h2>
        <ul>
          <li>View Indicators by latest update</li>
          <li>
            Improve Meeting/Presentation input to allow quali/quanti results
            input
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <Logo type="single" class="logo" />
    </div>
  </div>
</template>
<script>
import Dashboard from '~/components/Dashboard'
import Logo from '~/components/crosby-solutions'
export default {
  components: {
    Dashboard,
    Logo,
  },
}
</script>
<style scoped>
h1 {
  text-align: left;
}
.main {
  padding: 1rem;
  flex: 1 0 calc(100% - 1rem);
}
.footer {
  flex: 0 0 1rem;
  font-size: 0.8rem;
  text-align: right;
}
.logo {
  font-size: 16px;
  width: 8em;
  height: 1em;
  margin: 0;
  margin-left: calc(100% - 8em);
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
