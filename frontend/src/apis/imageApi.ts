import { Event } from '@/models/EventModel'
import axios, { type AxiosProgressEvent } from 'axios'

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

export { upload }
