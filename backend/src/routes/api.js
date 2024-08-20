import express from 'express'

var router = express.Router()

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ message: 'You must be logged in to access this resource.' }) // Unauthorized
}

router.get('/', ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Welcome to the dashboard' })
})

export default router
