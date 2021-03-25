<template>
  <section class="section">
    <div class="container">
      <div class="profile-box">
        <h2 class="title">My Profile</h2>
        <div class="content">
          <p>
            <strong>Username:</strong>
            {{ loggedInUser.username }}
          </p>
          <p>
            <strong>Email:</strong>
            {{ loggedInUser.email }}
          </p>
        </div>
      </div>
      <div class="future-plans">
        <p>
          Future Plans: <br />
          List of indicators for which user is focal point
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>
<style scoped>
.container {
  justify-content: flex-start;
}

.profile-box {
  text-align: left;
  padding: 2rem;
}
.future-plans {
  text-align: left;
}
</style>
