import sharp, { Sharp, FormatEnum } from 'sharp'
import path from 'path'
import crypto from 'crypto'

import { getUploadFolder } from '../data/storage.js'
import Image from '../models/Image.js'

const storeImage = async (
  buffer: Buffer,
  eventId: number,
  description: string
) => {
  try {
    const image = sharp(buffer)
    const metadata = await image.metadata()

    if (!metadata.width) {
      throw Error('Could not read metadata.')
    }

    let width = 320
    let images: Sharp[] = []
    while (width < metadata.width / 2 && width <= 1280) {
      images.push(resizeImage(image, width))
    }
    const dbEntry = await Image.create({
      event_id: eventId,
      description: description
    })
    console.log(dbEntry)
    // for (let i of images) {
    //   await saveImage(i)
    // }
  } catch (err) {
    console.log(err)
  }
}

const saveImage = async (image: Sharp, original: boolean = false) => {
  const uuid = crypto.randomUUID()
  const metadata = await image.metadata()
  const fileName = path.join(getUploadFolder(), `${uuid}.${metadata.format}`)
  await image.toFile(fileName)
  console.log(`written image to ${fileName}`)
}

const resizeImage = (
  image: Sharp,
  width: number,
  format: keyof FormatEnum = 'webp'
): Sharp => {
  return image.resize({ width: width }).toFormat(format)
}

export { storeImage }
