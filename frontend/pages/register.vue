<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Register</h2>

          <Notification v-if="success" type="success" :message="success" />
          <Notification v-if="error" type="danger" :message="error" />

          <form v-if="!success" method="post" @submit.prevent="register">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  v-model="username"
                  type="text"
                  class="input"
                  name="username"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  type="email"
                  class="input"
                  name="email"
                  required
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
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Reenter Password</label>
              <div class="control">
                <input
                  v-model="password2"
                  type="password"
                  class="input"
                  name="password"
                  required
                />
              </div>
            </div>
            <div class="control button-control">
              <Spinner v-if="loading" />
              <button
                v-else
                type="submit"
                class="space-top button--grey"
                @click.prevent="register"
              >
                Register
              </button>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/notification'
import Spinner from '~/components/spinner.vue'

export default {
  components: {
    Notification,
    Spinner,
  },
  middleware: 'guest',
  data() {
    return {
      loading: false,
      username: '',
      email: '',
      password: '',
      password2: '',
      success: null,
      error: null,
    }
  },
  methods: {
    async register() {
      if (this.password !== this.password2) {
        this.error = 'Passwords do not match'
        return
      }
      this.loading = true
      this.error = null
      try {
        this.$axios.setToken(false)
        await this.$axios.post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.success = `A confirmation link has been sent to your email account. \
 Please click on the link to complete the registration process.`
        this.loading = false
      } catch (e) {
        console.log('e: ', e.response)
        this.loading = false
        this.error =
          e.response.data.message[0]?.messages[0]?.message ||
          e.response.data.data[0]?.messages[0]?.message ||
          e.response.data.message.code ||
          'An unknown error occurred'
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
.button-control {
  height: 80px;
  padding: 1rem;
}
</style>
