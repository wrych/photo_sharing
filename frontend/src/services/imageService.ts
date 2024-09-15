import type { Event } from '@/models/EventModel'
import * as imageApi from '@/apis/imageApi'
import type { AxiosProgressEvent } from 'axios'
import { toRef } from 'vue'
import { useImageRepository } from '@/repositories/imageRepository'

class ImageService {
  private repository = useImageRepository()

  getImagesByEvent = (event: Event) => {
    return toRef(this.repository.getImagesByEvent(event))
  }

  uploadImage = async (
    file: File,
    description: string,
    event: Event,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<void> => {
    await imageApi.upload(file, description, event, onUploadProgress)
  }
}

let imageService: ImageService | null = null

export const useImageService = (): ImageService => {
  if (!imageService) {
    imageService = new ImageService()
  }
  return imageService
}
