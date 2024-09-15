import sharp, { Sharp, FormatEnum } from 'sharp'
import path from 'path'
import crypto from 'crypto'

import { getUploadFolder } from '../data/storage.js'
import Image, {
  ImageDTO,
  ImageSource,
  ImageSourceDTO
} from '../models/Image.js'

const DEFAULT_FORMAT = 'webp'

const toImageDTO = (image: Image): ImageDTO | null => {
  if (image) {
    const plainImage = image.get({ plain: true })

    if (plainImage.image_sources) {
      const imageSourcesWithHref: ImageSourceDTO[] =
        plainImage.image_sources.map((source: any) => ({
          value: {
            ...source,
            href: `/api/images/${source.id}.${source.format}`
          }
        }))

      return {
        id: plainImage.id,
        event_id: plainImage.event_id,
        description: plainImage.description,
        image_sources: imageSourcesWithHref
      }
    }
  }
  return null
}

const getImageById = async (id: number): Promise<ImageDTO | null> => {
  const image = await Image.findOne({
    where: { id: id },
    include: [
      {
        model: ImageSource,
        as: 'image_sources',
        attributes: ['id', 'width', 'height', 'format', 'size', 'is_original']
      }
    ]
  })
  return toImageDTO(image)
}

const getImagesByEventId = async (id: number) => {
  const images = await Image.findAll({
    where: { event_id: id },
    include: [
      {
        model: ImageSource,
        as: 'image_sources',
        attributes: ['id', 'width', 'height', 'format', 'size', 'is_original']
      }
    ]
  })
  return images.map((image) => ({ value: toImageDTO(image) }))
}

const storeImage = async (
  buffer: Buffer,
  eventId: number,
  description: string
): Promise<Image> => {
  try {
    const image = sharp(buffer)
    const metadata = await image.metadata()

    if (!metadata.width) {
      throw Error('Could not read metadata.')
    }
    let width = 320
    const dbImage = await Image.create({
      event_id: eventId,
      description: description
    })
    await saveImageSource(image, dbImage, { isOriginal: true })
    while (width < metadata.width / 2 && width <= 1280) {
      await saveImageSource(image, dbImage, { width: width })
      width *= 2
    }
    return dbImage
  } catch (err) {
    console.log(err)
  }
}

const saveImageSource = async (
  image: Sharp,
  dbImage: Image,
  options?: {
    width?: number
    format?: keyof FormatEnum
    isOriginal?: boolean
  }
) => {
  const uuid = crypto.randomUUID()
  const metadata = await image.metadata()
  const filePath = path.join(
    getUploadFolder(),
    `${uuid}.${options?.format ? options.format : DEFAULT_FORMAT}`
  )
  const outputInfo = await saveImageToFile(image, options, metadata, filePath)
  await createImageSource(dbImage, filePath, outputInfo, options)
}

const saveImageToFile = async (
  image: sharp.Sharp,
  options:
    | { width?: number; format?: keyof FormatEnum; isOriginal?: boolean }
    | undefined,
  metadata: sharp.Metadata,
  filePath: string
): Promise<sharp.OutputInfo> => {
  return await image
    .resize(options?.width ? options.width : metadata.width)
    .toFormat(options?.format ? options.format : DEFAULT_FORMAT)
    .toFile(filePath)
}

const createImageSource = async (
  dbImage: Image,
  filePath: string,
  outputInfo: sharp.OutputInfo,
  options:
    | { width?: number; format?: keyof FormatEnum; isOriginal?: boolean }
    | undefined
) => {
  await ImageSource.create({
    image_id: dbImage.id,
    filename: path.basename(filePath),
    filepath: filePath,
    width: outputInfo.width,
    height: outputInfo.height,
    format: outputInfo.format,
    size: outputInfo.size,
    is_original: options?.isOriginal ? options.isOriginal : false
  })
}

const getImageSourceById = async (id: number) => {
  return await ImageSource.findOne({ where: { id: id } })
}

export { storeImage, getImageById, getImageSourceById, getImagesByEventId }
