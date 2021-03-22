<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div v-if="isAuthenticated" class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Logged in as: {{ loggedInUser.username }}
            <div class="arrow-down"></div>
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item" href="/profile">My Profile</a>
            <hr class="navbar-divider" />
            <a class="navbar-item" @click="logout">Logout</a>
          </div>
        </div>
      </div>

      <div v-if="!isAuthenticated" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <nuxt-link class="button is-primary" to="/register">
              <strong>Register</strong>
            </nuxt-link>
            <nuxt-link class="button is-light" to="/login"> Log in </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
<style scoped>
.navbar,
a {
  color: white;
}
a {
  text-decoration: none;
}
.button {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px grey solid;
}
.is-primary {
  background: var(--color-orange);
}
.is-light {
  background: var(--color-light-orange);
}
.arrow-down {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.navbar-dropdown {
  height: 0;
  transform: translateY(-999px);
}
.is-active {
  height: auto;
  transform: none;
}
</style>
