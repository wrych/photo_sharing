import User from '../models/User.js'
import { hashPassword } from './auth.js'

const registerUser = async (
  username: string,
  password: string
): Promise<User> => {
  const hashedPassword = await hashPassword(password)
  return await User.create({
    username: username,
    hashedPassword: hashedPassword
  })
}

export { registerUser }
