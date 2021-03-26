<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Log In</h2>

          <Notification v-if="error" type="danger" :message="error" />

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  type="email"
                  class="input"
                  name="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  type="password"
                  class="input"
                  name="password"
                />
              </div>
            </div>
            <div class="control">
              <Spinner v-if="loading" />
              <button v-else type="submit" class="button--grey space-top">
                Log In
              </button>
            </div>
          </form>
          <div style="margin-top: 20px">
            <p>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </p>
            <p>
              <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/notification'

export default {
  components: {
    Notification,
  },
  middleware: 'guest',
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      this.error = null
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.email,
            password: this.password,
          },
        })
        this.loading = false
        this.$router.push('/')
      } catch (e) {
        this.loading = false
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
<style scoped>
.field {
  margin-top: 1rem;
  width: 250px;
  text-align: left;
}
.label,
.space-top {
  margin-top: 1rem;
}
.input {
  width: 100%;
  height: 2rem;
}
</style>
