import { Event } from '@/models/EventModel'
import axios, { type AxiosProgressEvent } from 'axios'
import { getJson } from './common'
import { Image, Images } from '@/models/ImageModel'

const upload = async (
  file: File,
  description: string,
  event: Event,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
): Promise<void> => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('description', description)
  formData.append('eventId', event.id.toString())
  axios.post('/api/image/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: onUploadProgress
  })
}

const getImageById = async (id: number): Promise<Image> => {
  return Image.fromJSON(await getJson(`/api/images/${id}`))
}

const getImagesByEvent = async (event: Event): Promise<Images> => {
  return Images.fromJSON(await getJson(`/api/images/?event_id=${event.id}`))
}

export { upload, getImageById, getImagesByEvent }
