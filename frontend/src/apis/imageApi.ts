import { Event } from '@/models/EventModel'
import axios, { type AxiosProgressEvent } from 'axios'
import { getJson, postForm } from './common'
import { Image, Images } from '@/models/ImageModel'

const upload = async (
  file: File,
  description: string,
  event: Event,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
): Promise<Image> => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('description', description)
  formData.append('eventId', event.id.toString())
  return Image.fromJSON(
    await postForm(`/api/image/upload`, formData, onUploadProgress)
  )
}

const getImageById = async (id: number): Promise<Image> => {
  return Image.fromJSON(await getJson(`/api/images/${id}`))
}

const getImagesByEvent = async (event: Event): Promise<Images> => {
  return Images.fromJSON(await getJson(`/api/images/?event_id=${event.id}`))
}

export { upload, getImageById, getImagesByEvent }
