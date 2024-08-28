import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import crypto from 'crypto'
import User from '../models/User.js'

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
        const user: User | null = await User.findOne({
          where: { username: username }
        })

        if (!user) {
          return cb(null, false, { message: 'Incorrect username or password.' })
        }

        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          'sha256',
          function (err, hashedPassword) {
            if (err) {
              return cb(err)
            }

            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
              return cb(null, false, {
                message: 'Incorrect username or password.'
              })
            }

            return cb(null, user)
          }
        )
      } catch (err) {
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
    successRedirect: '/auth/',
    failureRedirect: '/auth/login'
  })
)

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/auth/')
  })
})

router.get('/signup', function (req, res) {
  res.render('signup')
})

router.post('/signup', async function (req, res, next) {
  try {
    const salt = crypto.randomBytes(16)

    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        if (err) {
          return next(err)
        }

        try {
          const newUser = await User.create({
            username: req.body.username,
            hashed_password: hashedPassword,
            salt: salt
          })

          req.login(newUser, function (err) {
            if (err) {
              return next(err)
            }
            return res.redirect('/auth')
          })
        } catch (err) {
          return next(err)
        }
      }
    )
  } catch (err) {
    return next(err)
  }
})

export default router
