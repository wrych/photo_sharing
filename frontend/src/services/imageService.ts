import type { Event } from '@/models/EventModel'
import * as imageApi from '@/apis/imageApi'
import type { AxiosProgressEvent } from 'axios'
import { ref, toRef, type Ref } from 'vue'
import { useImageRepository } from '@/repositories/imageRepository'
import type { Images } from '@/models/ImageModel'

class ImageService {
  private repository = useImageRepository()
  event = ref<Event | undefined>(undefined)
  images = ref<Images | undefined>(undefined)

  getImagesByEvent = (event: Event) => {
    return toRef(this.repository.getImagesByEvent(event))
    watch(event, async (newEvent) => {
      this.updateImagesByEvent(newEvent)
    })
    return this.images
  }

  updateImagesByEvent = (event: Event, images: Ref<Images | undefined>) => {
    return this.repository.updateImagesByEvent(event, images)
  }

  uploadImage = async (
    file: File,
    description: string,
    event: Event,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<void> => {
    console.log(
      await imageApi.upload(file, description, event, onUploadProgress)
    )
  }
}

export const useImageService = (): ImageService => {
  return new ImageService()
}
