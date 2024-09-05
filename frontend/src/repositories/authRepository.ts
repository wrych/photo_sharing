import { toRef } from 'vue'
import type { Ref } from 'vue'

import { useAuthStore } from '@/stores/authStore'
import * as authApi from '@/apis/authApi'
import type { AuthUser } from '@/models/AuthModel'

import { logStateChange } from './common'

class AuthRepository {
  private store = useAuthStore()

  logStateChange<T extends (...args: any[]) => ReturnType<T>>(fn: T) {
    return logStateChange(this.store, fn)
  }

  updateUser = async (): Promise<void> => {
    this.store.user = await authApi.getUser()
  }

  getUser = (): Ref<AuthUser | null> => {
    if (this.store.user === undefined) {
      this.logStateChange(this.updateUser)()
    }
    return toRef(this.store, 'user')
  }

  getProcessing = (): Ref<boolean> => {
    return toRef(this.store, 'isProcessing')
  }
}

let authRepository: AuthRepository | null = null

export const useAuthRepository = (): AuthRepository => {
  if (!authRepository) {
    authRepository = new AuthRepository()
  }
  return authRepository
}
