import argon2 from 'argon2'
import User from '../models/User.js'

const incorrectUsernameOrPasswordMessage = 'Incorrect username or password'

const verifyPassword = async (
  user: User,
  password: string,
  cb: (
    err: Error | null,
    user?: User | false,
    message?: { message: string }
  ) => void
) => {
  try {
    const isPasswordCorrect = await argon2.verify(user.hashedPassword, password)
    if (!isPasswordCorrect) {
      return cb(null, false, {
        message: incorrectUsernameOrPasswordMessage
      })
    }
    return cb(null, user)
  } catch (err: any) {
    return cb(err)
  }
}

const verifyUserAndPassword = async (
  username: string,
  password: string,
  cb: (
    err: Error | null,
    user?: User | false,
    info?: { message: string }
  ) => void
) => {
  const user: User | null = await User.findOne({
    where: { username: username }
  })

  if (!user) {
    return cb(null, false, { message: incorrectUsernameOrPasswordMessage })
  }

  return await verifyPassword(user, password, cb)
}

const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password)
}

export { verifyUserAndPassword, verifyPassword, hashPassword }
