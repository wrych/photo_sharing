<script setup lang="ts">
import LoginComponent from '@/components/LoginComponent.vue'
import { useAuthService } from '@/services/authService'

const authService = useAuthService()

const logout = async () => {
  await authService.logout()
}

const user = authService.getUser()
const isProcessing = authService.getProcessing()
</script>

<template>
  <div>
    <h1>API Auth State</h1>
    <div v-if="isProcessing || user === undefined">
      Loading user information...
    </div>
    <div v-else-if="user">
      Hello {{ user.username }}!
      <form @submit.prevent="logout">
        <button type="submit">logout</button>
      </form>
    </div>
    <div v-else-if="user === null">
      <LoginComponent />
    </div>
    <div v-else>Unexpected state...</div>
  </div>
</template>

<style scoped></style>
