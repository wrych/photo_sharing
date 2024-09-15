import express, { Request, Response } from 'express'

import { ensureAuthenticated } from './auth.js'
import { imageUpload } from '../../data/storage.js'
import * as imageService from '../../services/image.js'
import path from 'path'

const imageRouter = express.Router()

imageRouter.post(
  '/upload',
  imageUpload.single('image'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send('No image uploaded.')
    }
    const { description, eventId } = req.body
    const image = await imageService.storeImage(
      req.file.buffer,
      eventId,
      description
    )

    res.status(201).send({
      value: imageService.getImageById(image.id)
    })
  }
)

imageRouter.get('/:id', async (req, res) => {
  const image = await imageService.getImageById(parseInt(req.params.id))
  res.status(200).send({
    value: image
  })
})

const imagesRouter = express.Router()
const rootpath = process.cwd()

imagesRouter.get('/', async (req, res) => {
  const eventId = parseInt(req.query.event_id)
  res
    .status(200)
    .send({ value: await imageService.getImagesByEventId(eventId) })
})

imagesRouter.get('/:file', async (req, res) => {
  const sourceId = parseInt(path.parse(req.params.file).name)
  const imageSource = await imageService.getImageSourceById(sourceId)

  if (imageSource) {
    const fspath = path.join(rootpath, imageSource.filepath)
    res.sendFile(fspath, (err) => {
      if (err) {
        res.status(404).send({ message: 'File not found!' })
      }
    })
  } else {
    res.status(404).send({ message: 'File not found!' })
  }
})

export { imageRouter, imagesRouter }
