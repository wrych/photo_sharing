import { ref, watch, type Ref } from 'vue'

import * as imageApi from '@/apis/imageApi'
import { Image, Images } from '@/models/ImageModel'
import { Event } from '@/models/EventModel'

class ImageRepository {
  getImagesByEvent = async (event: Event): Ref<Images | undefined> => {
    return await imageApi.getImagesByEvent(event)
  }

  getImageById = (id: number): Ref<Image | undefined> => {
    const image = ref<Image | undefined>(undefined)
    ;(async () => {
      image.value = await imageApi.getImageById(id)
    })()
    return image
  }

  updateImagesByEvent = async (
    event: Event,
    images: Ref<Images | undefined>
  ): Promise<void> => {
    images.value = 
  }
}

let imageRepository: ImageRepository | null = null

export const useImageRepository = (): ImageRepository => {
  if (!imageRepository) {
    imageRepository = new ImageRepository()
  }
  return imageRepository
}
