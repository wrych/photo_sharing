import { User } from '@/models/UserModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const isProcessing = ref<boolean>(false)
  const user = ref<User | undefined>(undefined)

  return {
    isProcessing,
    user
  }
})
