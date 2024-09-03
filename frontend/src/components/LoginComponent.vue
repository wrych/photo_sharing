<script setup lang="ts">
import { ref } from 'vue'

import { login as apiLogin } from '@/services/userService'

const loginForm = ref({
  password: '',
  username: ''
})
const processing = ref<boolean>(false)

const login = async () => {
  processing.value = true
  const success = await apiLogin(
    loginForm.value.username,
    loginForm.value.password
  )
  processing.value = false
  console.log(success)
}
</script>

<template>
  <div>
    <h1>Log In</h1>
    <form @submit.prevent="login">
      <label for="username">Username</label>
      <input
        id="username"
        v-model="loginForm.username"
        name="username"
        type="text"
        autocomplete="username"
        placeholder="Username"
        :disabled="processing"
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
        :disabled="processing"
        required
      />
      <button type="submit" :disabled="processing">Sign in</button>
    </form>
  </div>
</template>

<style scoped></style>
