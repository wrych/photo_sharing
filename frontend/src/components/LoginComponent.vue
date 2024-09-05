<script setup lang="ts">
import { ref } from 'vue'

import { useAuthService } from '@/services/authService.js'

const authService = useAuthService()

const authUser = authService.getUser()
const isProcessing = authService.getProcessing()

const loginForm = ref({
  password: '',
  username: ''
})

const login = async () => {
  await authService.login(loginForm.value.username, loginForm.value.password)
}
</script>

<template>
  <div>
    <h1>Log In</h1>
    <div v-if="authUser">
      Welcome!
      <br />
      You are logged in as {{ authUser.username }}!
    </div>
    <div v-else-if="isProcessing">
      Please be patient, currently processing a request!
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
          placeholder="Password"
          required
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
