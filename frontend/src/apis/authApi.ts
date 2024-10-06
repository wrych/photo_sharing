import { AuthUser } from '../models/AuthUserModel.js'
import { getJson, postJson } from './common.js'

const getUser = async (): Promise<AuthUser | null> => {
  return AuthUser.fromJSON(await getJson('/api/auth/user'))
}

const login = async (username: string, password: string): Promise<void> => {
  await postJson('/api/auth/login/password', {
    username: username,
    password: password
  })
}

const logout = async (): Promise<void> => {
  await postJson('/api/auth/logout')
}

export { getUser, login, logout }
