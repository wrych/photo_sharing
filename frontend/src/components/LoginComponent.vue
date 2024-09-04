<script setup lang="ts">
import { ref } from 'vue'

import { login as apiLogin } from '@/services/userService'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const loginForm = ref({
  password: '',
  username: ''
})

const login = async () => {
  const success = await apiLogin(
    loginForm.value.username,
    loginForm.value.password
  )
}
</script>

<template>
  <div>
    <h1>Log In</h1>
    <div v-if="userStore.user">
      Welcome!
      <br />
      You are logged in as {{ userStore.user.username }}!
    </div>
    <div v-else-if="userStore.isProcessing">
      Please be patient, currently processing a log in request!
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
  </div>
</template>

<style scoped></style>
