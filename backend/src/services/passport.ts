import passport from 'passport'
import { Express } from 'express'
import { verifyUserAndPassword } from './auth'
import { Strategy } from 'passport-local'
import User from '../models/User'

export const setupPassport = async (app: Express) => {
  passport.use(
    new Strategy(
      async (
        username: string,
        password: string,
        cb: (
          err: Error | null,
          user?: User | false,
          info?: { message: string }
        ) => void
      ) => {
        try {
          return await verifyUserAndPassword(username, password, cb)
        } catch (err: any) {
          return cb(err)
        }
      }
    )
  )

  passport.serializeUser((user, cb) => {
    cb(null, (user as User).id)
  })

  passport.deserializeUser(async (id: string, cb) => {
    try {
      const user = await User.findByPk(id)
      cb(null, user)
    } catch (err) {
      cb(err, null)
    }
  })
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(passport.authenticate('session'))
}
