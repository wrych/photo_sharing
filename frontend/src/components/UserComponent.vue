<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

class BadResponseFormatError extends Error {
  constructor() {
    super('Malformed response')
  }
}

interface User {
  username: string
  id: number
}

interface AuthentificationState {
  value?: string
}

const errorMessage = ref('')
const authState = ref<string | undefined>(undefined)
const user = ref<User | null>(null)
const loginForm = ref({
  password: '',
  username: ''
})

onMounted(async () => {
  fetchAuthorisationState()
  setInterval(() => {
    fetchAuthorisationState()
    if (authState.value === 'authorised') {
      fetchAuthorisatedUser()
    }
  }, 2000)
})

const fetchAuthorisationState = async () => {
  try {
    const response = await axios.get<AuthentificationState>('/api/auth/state')
    if (!response.headers['content-type'].startsWith('application/json')) {
      throw new BadResponseFormatError()
    }
    authState.value = response.data.value
  } catch (err: any) {
    errorMessage.value = 'Failed to fetch authorisation state: ' + err.message
  }
}

const fetchAuthorisatedUser = async () => {
  try {
    const response = await axios.get('/api/auth/user')
    if (!response.headers['content-type'].startsWith('application/json')) {
      throw new BadResponseFormatError()
    }
    user.value = response.data.value
  } catch (err: any) {
    errorMessage.value = 'Failed to fetch user: ' + err.message
  }
}

const login = async () => {
  try {
    await axios.post('/api/auth/login/password', {
      username: loginForm.value.username,
      password: loginForm.value.password
    })
    errorMessage.value = ''
  } catch (err: any) {
    errorMessage.value = 'Failed to log-in: ' + err.message
  }
}

const logout = async () => {
  try {
    await axios.post('/api/auth/logout')
    errorMessage.value = ''
  } catch (err: any) {
    errorMessage.value = 'Failed to log-in: ' + err.message
  }
}
</script>

<template>
  <div>
    <h1>API Auth State</h1>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else-if="authState">
      Authorisation State: {{ authState }}
      <div v-if="authState === 'authorised' && user">
        Hello {{ user.username }}!
        <form @submit.prevent="logout">
          <button type="submit">logout</button>
        </form>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="loginForm.username"
            name="username"
            type="text"
            autocomplete="username"
            placeholder="Username"
            required
            autofocus
          />
          <label for="current-password">Password</label>
          <input
            id="current-password"
            v-model="loginForm.password"
            name="password"
            type="password"
            autocomplete="current-password"
            placeholder="*****"
            required
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
