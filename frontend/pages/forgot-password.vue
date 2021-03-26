<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Forgot Password</h2>

          <Notification v-if="success" type="success" :message="success" />
          <Notification v-if="error" type="danger" :message="error" />

          <form v-if="!success" method="post" @submit.prevent="forgotPassword">
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
            <div class="control">
              <Spinner v-if="waiting" />
              <button v-else type="submit" class="button--grey space-top">
                Email me a reset link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/notification'
import Spinner from '~/components/spinner'

export default {
  components: {
    Notification,
    Spinner,
  },
  middleware: 'guest',
  data() {
    return {
      waiting: false,
      email: '',
      success: null,
      error: null,
    }
  },
  methods: {
    async forgotPassword() {
      this.waiting = true
      this.error = null
      try {
        await this.$axios.post('auth/forgot-password', {
          email: this.email,
        })
        this.success = `A reset password link has been sent to your email account. \
 Please click on the link to complete the password reset.`
        this.waiting = false
      } catch (e) {
        console.log('e.response', e.response)
        this.error =
          e.response.data.message[0]?.messages[0]?.message ||
          e.response.data.message.code
        this.waiting = false
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
