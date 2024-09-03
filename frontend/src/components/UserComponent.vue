<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useUserStore } from '@/stores/userStore'
import { logout as apiLogout } from '@/services/userService'
import LoginComponent from '@/components/LoginComponent.vue'

const userStore = useUserStore()

const logout = async () => {
  await apiLogout()
}
</script>

<template>
  <div>
    <h1>API Auth State</h1>
    <div v-if="userStore.user">
      Hello {{ userStore.user.username }}!
      <form @submit.prevent="logout">
        <button type="submit">logout</button>
      </form>
    </div>
    <div v-else>
      <LoginComponent />
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
