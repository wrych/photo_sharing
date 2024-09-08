import type { Event } from '@/models/EventModel'
import * as imageApi from '@/apis/imageApi'
import type { AxiosProgressEvent } from 'axios'

class ImageService {
  //   private repository = useImageRepository()

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
