import express from 'express'
import passport from 'passport'
import { json } from 'sequelize'

var authRouter = express.Router()

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ message: 'Authorisation required.' }) // Unauthorized
}

authRouter.get('/state', (req, res) => {
  res.status(200).json({ value: req.user ? 'authorised' : 'unauthorised' })
})

authRouter.get('/user', ensureAuthenticated, (req, res) => {
  res.status(200).json({ value: req.user })
})


authRouter.post('/login/password', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Unexpected error.' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Unexpected error.' });
      }
      return res.status(200).json({ message: 'log-in successful' });
    });
  })(req, res, next)
});

authRouter.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Unexpected error.' });
    }
    return res.status(200).json({ "message": "log-out successful" })
  })
});

export default authRouter
export { ensureAuthenticated }
