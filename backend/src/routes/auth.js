import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import User from '../models/User.js'

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ where: { username: username } })

      if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' })
      }

      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) {
          return cb(err)
        }

        if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' })
        }

        return cb(null, user)
      })
    } catch (err) {
      return cb(err)
    }
  })
)

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

var router = express.Router()

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
