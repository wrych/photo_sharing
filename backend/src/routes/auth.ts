import express from 'express'
import passport from 'passport'
import { registerUser } from '../services/user.js'

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
