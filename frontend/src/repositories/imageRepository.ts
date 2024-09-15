import { ref, watch, type Ref } from 'vue'

import * as imageApi from '@/apis/imageApi'
import { Image, Images } from '@/models/ImageModel'
import { Event } from '@/models/EventModel'

class ImageRepository {
  getImagesByEvent = (event: Event): Ref<Images | undefined> => {
    const images = ref<Images | undefined>(undefined)
    watch(event, async (newEvent) => {
      images.value = await imageApi.getImagesByEvent(newEvent)
    })
    return images
  }

  getImageById = (id: number): Ref<Image | undefined> => {
    const image = ref<Image | undefined>(undefined)
    ;(async () => {
      image.value = await imageApi.getImageById(id)
    })()
    return image
  }
}

let imageRepository: ImageRepository | null = null

export const useImageRepository = (): ImageRepository => {
  if (!imageRepository) {
    imageRepository = new ImageRepository()
  }
  return imageRepository
}
