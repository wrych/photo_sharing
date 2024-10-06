import { Event } from '@/models/EventModel'
import { type AxiosProgressEvent } from 'axios'
import { getJson, postForm, postJson } from './common'
import {
  Image,
  Images,
  type ImageDTO,
  type ImagesDTO
} from '@/models/ImageModel'

export const upload = async (
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
    (await postForm(
      `/api/image/upload`,
      formData,
      onUploadProgress
    )) as ImageDTO
  )
}

export const updateDescription = async (image: Image): Promise<Image> => {
  return Image.fromJSON(
    (await postJson(`/api/image/${image.id}/description`, {
      value: image.description
    })) as ImageDTO
  )
}

export const getImageById = async (id: number): Promise<Image> => {
  return Image.fromJSON((await getJson(`/api/images/${id}`)) as ImageDTO)
}

export const getImagesByEvent = async (event: Event): Promise<Images> => {
  return Images.fromJSON(
    (await getJson(`/api/images/?event_id=${event.id}`)) as ImagesDTO
  )
}
