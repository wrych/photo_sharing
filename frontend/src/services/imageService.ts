import type { Event } from '@/models/EventModel'
import * as imageApi from '@/apis/imageApi'
import type { AxiosProgressEvent } from 'axios'
import { ref, toRef, type Ref } from 'vue'
import {
  useImageRepository,
  ImageRepository
} from '@/repositories/imageRepository'
import type { Images } from '@/models/ImageModel'

class ImageService {
  event = ref<Event | undefined>(undefined)
  private repository!: ImageRepository
  images = ref<Images | undefined>(undefined)

  constructor(event: Ref<Event | undefined>) {
    this.event = event
    this.repository = useImageRepository(this.event)
  }

  getImages = () => {
    return this.repository.getImages()
  }

  updateImages = () => {
    return this.repository.updateImages()
  }

  uploadImage = async (
    file: File,
    description: string,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<void> => {
    if (this.event.value) {
      const image = await imageApi.upload(
        file,
        description,
        this.event.value,
        onUploadProgress
      )
      this.repository.updateImage(image)
    }
  }
}

export const useImageService = (
  event: Ref<Event | undefined>
): ImageService => {
  return new ImageService(event)
}
