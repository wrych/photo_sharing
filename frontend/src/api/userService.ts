import { AuthentificationState, User } from '../models/UserModel.js'
import axios from 'axios'
import { fetchJson } from './common'

const fetchAuthorisationState = async (): Promise<AuthentificationState> => {
  return AuthentificationState.fromJSON(await fetchJson('/api/auth/state'))
}

const fetchAuthorisatedUser = async (): Promise<User> => {
  return User.fromJSON(await fetchJson('/api/auth/user'))
}

const login = async (
  username: string,
  password: string
): Promise<boolean | Error> => {
  try {
    const res = await axios.post('/api/auth/login/password', {
      username: username,
      password: password
    })
    return res.status === 200 ? true : false
  } catch (err: any) {
    throw Error(`Log in failed with error ${err}.`)
  }
}

const logout = async (): Promise<Boolean | Error> => {
  try {
    const res = await axios.post('/api/auth/logout')
    return res.status === 200 ? true : false
  } catch (err: any) {
    throw Error(`Log out failed with error ${err}.`)
  }
}

export { fetchAuthorisationState, fetchAuthorisatedUser, login, logout }
