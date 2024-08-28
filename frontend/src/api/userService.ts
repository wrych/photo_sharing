import { AuthentificationState, User } from '@/models/userModels'
import axios from 'axios'
import { BadResponseFormatError } from './common'

const fetchAuthorisationState = async (): Promise<AuthentificationState> => {
  const response = await axios.get<AuthentificationState>('/api/auth/state')
  if (!response.headers['content-type'].startsWith('application/json')) {
    throw new BadResponseFormatError()
  }
  return AuthentificationState.fromJSON(response.data)
}

const fetchAuthorisatedUser = async (): Promise<User> => {
  const response = await axios.get('/api/auth/user')
  if (!response.headers['content-type'].startsWith('application/json')) {
    throw new BadResponseFormatError()
  }
  return User.fromJSON(response.data)
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

const logout = async () => {
  try {
    await axios.post('/api/auth/logout')
    errorMessage.value = ''
  } catch (err: any) {
    errorMessage.value = 'Failed to log-in: ' + err.message
  }
}
