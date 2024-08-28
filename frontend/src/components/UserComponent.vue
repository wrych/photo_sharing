<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

import { AuthentificationState, User } from '@/models/userModels'
import {
  fetchAuthorisatedUser,
  fetchAuthorisationState,
  login as apiLogin,
  logout as apiLogout
} from '@/api/userService'

const errorMessage = ref('')
const authState = ref<AuthentificationState | undefined>(undefined)
const user = ref<User | null>(null)
const loginForm = ref({
  password: '',
  username: ''
})

onMounted(async () => {
  authState.value = await fetchAuthorisationState()
  setInterval(async () => {
    authState.value = await fetchAuthorisationState()
    if (authState.value.value === 'authorised') {
      user.value = await fetchAuthorisatedUser()
    }
  }, 2000)
})

const login = async () => {
  await apiLogin(loginForm.value.username, loginForm.value.password)
}

const logout = async () => {
  await apiLogout()
}
</script>

<template>
  <div>
    <h1>API Auth State</h1>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else-if="authState">
      Authorisation State: {{ authState.value }}
      <div v-if="authState.value === 'authorised' && user">
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
