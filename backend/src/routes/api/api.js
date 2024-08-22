import express from 'express'

import authRouter from './auth.js'

var router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Photo Sharing API!' })
})

router.use('/auth', authRouter)

export default router
