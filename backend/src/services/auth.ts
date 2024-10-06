import bcrypt from 'bcrypt'
import User from '../models/User'

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
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    )
    console.log('isPasswordCorrect', isPasswordCorrect)
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
    return await cb(null, false, {
      message: incorrectUsernameOrPasswordMessage
    })
  }

  return await verifyPassword(user, password, cb)
}

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export { verifyUserAndPassword, verifyPassword, hashPassword }
