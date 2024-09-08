import multer, { FileFilterCallback } from 'multer'
import fs from 'fs'
import { Request } from 'express'

interface MulterFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  destination: string
  filename: string
  path: string
  buffer: Buffer
}

const fileFilter = (
  req: Request,
  file: MulterFile,
  next: FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ]

  if (allowedMimeTypes.includes(file.mimetype)) {
    next(null, true)
  } else {
    next(new Error('Invalid file type (allowed: JPEG, PNG, GIF, and WebP).'))
  }
}

const createUploadsFolder = (folderName: string): void => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true })
  }
}

const storage = multer.memoryStorage()
const imageUpload = multer({ storage: storage })

const uploadFolder = 'var/image/'
createUploadsFolder(uploadFolder)
const getUploadFolder = () => {
  return uploadFolder
}

export { getUploadFolder, imageUpload }
