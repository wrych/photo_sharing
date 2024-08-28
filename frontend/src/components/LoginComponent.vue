<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

const loginForm = ref({
  password: '',
  username: ''
})

const login = async () => {
  try {
    await axios.post('/api/auth/login/password', {
      username: loginForm.value.username,
      password: loginForm.value.password
    })
    //todo: clear message
  } catch (err: any) {
    //todo: post message
  }
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
</template>

<style scoped>
.error {
  color: red;
}
</style>
