import type { Event } from '@/models/EventModel'
import * as imageApi from '@/apis/imageApi'
import type { AxiosProgressEvent } from 'axios'
import { ref, toRef, type Ref } from 'vue'
import {
  useImageRepository,
  ImageRepository
} from '@/repositories/imageRepository'
import type { Image, Images } from '@/models/ImageModel'

export class ImageService {
  event = ref<Event | undefined>(undefined)
  private repository!: ImageRepository
  images = ref<Images | undefined>(undefined)

  constructor(event: Ref<Event | undefined>) {
    this.event = event
    this.repository = useImageRepository(this.event)

    setInterval(() => {
      this.updateImages()
    }, 10000)
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
  ): Promise<Ref<Image>> => {
    if (!this.event.value) {
      throw new Error('Event is not set...')
    }
    const image = await imageApi.upload(
      file,
      description,
      this.event.value,
      onUploadProgress
    )
    return this.repository.updateImage(image)
  }

  updateDescription = async (image: Image): Promise<Ref<Image>> => {
    const updatedImage = await imageApi.updateDescription(image)
    return this.repository.updateDescription(updatedImage)
  }
}

export const useImageService = (
  event: Ref<Event | undefined>
): ImageService => {
  return new ImageService(event)
}
