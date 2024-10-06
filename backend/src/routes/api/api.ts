import express, { Request, Response, NextFunction } from 'express'

import authRouter from './auth.js'
import eventRouter from './event.js'
import { imageRouter, imagesRouter } from './image.js'

const router = express.Router()

const setCommonHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  res.set('Content-Security-Policy', "default-src 'self'")
  res.set('X-Content-Type-Options', 'nosniff')
  res.set('X-Frame-Options', 'DENY')
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  res.set('X-XSS-Protection', '1; mode=block')
  res.set('Content-Type', 'application/json')
  next()
}

router.use(setCommonHeaders)

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Photo Sharing API!' })
})

router.use('/auth', authRouter)
router.use('/event', eventRouter)
router.use('/image', imageRouter)
router.use('/images', imagesRouter)

export default router
