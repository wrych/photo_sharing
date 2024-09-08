import express, { Request, Response } from 'express'

import { ensureAuthenticated } from './auth.js'
import { imageUpload } from '../../data/storage.js'
import { storeImage } from '../../services/image.js'

const imageRouter = express.Router()

imageRouter.post(
  '/upload',
  imageUpload.single('image'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send('No image uploaded.')
    }
    const { description, eventId } = req.body

    console.log('Description:', description)
    console.log('Event ID:', eventId)
    // storeImage(req.file.buffer, 1, 'some')

    res.send({
      message: 'Images uploaded and resized successfully!'
    })
  }
)

export default imageRouter
