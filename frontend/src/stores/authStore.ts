import { AuthUser } from '@/models/AuthUserModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isProcessing = ref<boolean>(false)
  const user = ref<AuthUser | undefined | null>(undefined)

  return {
    isProcessing,
    user
  }
})
