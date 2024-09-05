import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import User from '../models/User.js'
import { verifyUserAndPassword } from '../services/auth.js'
import { registerUser } from '../services/user.js'

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
      console.log('verifying user...')
      try {
        return await verifyUserAndPassword(username, password, cb)
      } catch (err: any) {
        return cb(err)
      }
    }
  )
)

type SerializableUser = {
  id?: number
  username?: string
}

passport.serializeUser((user: SerializableUser, cb) => {
  process.nextTick(() => {
    return cb(null, { id: user.id, username: user.username })
  })
})

passport.deserializeUser(function (user: User, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

const router = express.Router()

router.get(
  '/',
  function (req, res, next) {
    if (!req.user) {
      return res.render('home', { user: null })
    }
    next()
  },
  function (req, res) {
    res.locals.filter = null
    res.render('home', { user: req.user })
  }
)

router.get('/login', function (req, res) {
  res.render('login')
})

router.post(
  '/login/password',
  passport.authenticate('local', {
    successRedirect: '/_auth',
    failureRedirect: '/_auth/login'
  })
)

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/_auth')
  })
})

router.get('/signup', function (req, res) {
  res.render('signup')
})

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await registerUser(req.body.username, req.body.password)
    req.login(newUser, (err) => {
      if (err) {
        return next(err)
      }
      return res.redirect('/_auth')
    })
  } catch (err) {
    return next(err)
  }
})

export default router
