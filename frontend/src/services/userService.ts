import { User } from '../models/UserModel.js'
import axios from 'axios'
import { fetchJson, postJson } from './common.js'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()

const fetchUser = async (): Promise<User> => {
  return User.fromJSON(await fetchJson('/api/auth/user'))
}

const getUser = async (): Promise<void> => {
  try {
    userStore.user = await fetchUser()
  } catch (err) {
    console.log(err)
    userStore.user = undefined
  }
}

const login = async (username: string, password: string): Promise<void> => {
  userStore.isProcessing = true
  try {
    await postJson('/api/auth/login/password', {
      username: username,
      password: password
    })
    await getUser()
  } catch (err) {
    console.log(err)
  }
  userStore.isProcessing = false
}

const logout = async (): Promise<void> => {
  userStore.isProcessing = true
  try {
    await postJson('/api/auth/logout')
    userStore.user = undefined
  } catch (err) {
    console.log(err)
    await getUser()
  }
  userStore.isProcessing = false
}

export { login, logout }
