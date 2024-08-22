<template>
  <div>
    <h1>API Auth State</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="authState">
      Authorisation State: {{ authState }}
      <div v-if="authState === 'authorised'">
        Hello {{ user.username }}!
        <form @submit.prevent="logout">
          <button type="submit">logout</button>
        </form>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <label for="username">Username</label>
          <input id="username" name="username" type="text" autocomplete="username" placeholder="Username"
            v-model="loginForm.username" required autofocus>
          <label for="current-password">Password</label>
          <input id="current-password" name="password" type="password" autocomplete="current-password" placeholder="*****"
            v-model="loginForm.password" required>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from 'axios'

class BadResponseFormatError extends Error {
  constructor() {
    super('Malformed response')
  }
}

export default {
  data() {
    return {
      error: '',
      authState: null,
      user: null,
      loginForm: {
        password: null,
        username: null
      }
    }
  },
  mounted() {
    this.fetchAuthorisationState()
    setInterval(() => {
      this.fetchAuthorisationState()
      if (this.authState === 'authorised') {
        this.fetchAuthorisatedUser()
      }
    }, 2000)
  },
  methods: {
    async fetchAuthorisationState() {
      try {
        const response = await axios.get('/api/auth/state')
        if (!response.headers['content-type'].startsWith('application/json')) {
          throw new BadResponseFormatError(response)
        }
        this.authState = response.data.value
      } catch (error) {
        this.error = 'Failed to fetch message: ' + error.message
      }
    },
    async fetchAuthorisatedUser() {
      try {
        const response = await axios.get('/api/auth/user')
        if (!response.headers['content-type'].startsWith('application/json')) {
          throw new BadResponseFormatError(response)
        }
        this.user = response.data.value
      } catch (error) {
        this.error = 'Failed to fetch message: ' + error.message
      }
    },
    async login() {
      try {
        await axios.post('/api/auth/login/password',
          {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        )
        this.error = '';
      } catch (err) {
        this.error = 'Failed to log-in: ' + error.message
      }
    },
    async logout () {
      try {
        await axios.post('/api/auth/logout',
          {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        )
        this.error = '';
      } catch (err) {
        this.error = 'Failed to log-in: ' + error.message
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
