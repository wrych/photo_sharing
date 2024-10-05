import multer, { FileFilterCallback } from 'multer'
import fs from 'fs'
import { Request } from 'express'
import { rootPath } from '../meta.js'
import path from 'path'

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

const storageFolder = path.join(rootPath, 'var', 'image')
createUploadsFolder(storageFolder)
console.log(`Image storage folder: ${storageFolder}`)

export { storageFolder, imageUpload }
