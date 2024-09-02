import express from 'express'

import authRouter from './auth.js'
import eventRouter from './event.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Photo Sharing API!' })
})

router.use('/auth', authRouter)
router.use('/event', eventRouter)

export default router
