import type { AuthUser } from '@/models/AuthUserModel'
import { useAuthRepository } from '@/repositories/authRepository'
import * as authApi from '@/apis/authApi'
import type { Ref } from 'vue'

class AuthService {
  private repository = useAuthRepository()

  getUser = (): Ref<AuthUser | null | undefined> => {
    return this.repository.getUser()
  }

  getProcessing = (): Ref<Boolean> => {
    return this.repository.getProcessing()
  }

  logout = this.repository.logStateChange(async (): Promise<void> => {
    await authApi.logout()
    await this.repository.updateUser()
  })

  login = this.repository.logStateChange(
    async (username: string, password: string): Promise<void> => {
      await authApi.login(username, password)
      await this.repository.updateUser()
    }
  )
}

export const useAuthService = (): AuthService => {
  return new AuthService()
}
