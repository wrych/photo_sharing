import { ref, toRef, watch, type Ref } from 'vue'

import * as imageApi from '@/apis/imageApi'
import { Image, Images } from '@/models/ImageModel'
import { Event } from '@/models/EventModel'

export class ImageRepository {
  event = ref<Event | undefined>(undefined)
  private images = ref<Images | undefined>(undefined)

  constructor(event: Ref<Event | undefined>) {
    this.event = event
  }

  load = async () => {
    if (this.event.value) {
      this.images.value = await imageApi.getImagesByEvent(this.event.value)
    }
    return this.images
  }

  updateImage = (image: Image): Ref<Image> => {
    if (this.images.value) {
      this.images.value.images[image.id] = image
    }
    this.updateImages()
    return toRef(this.images.value!.images, image.id)
  }

  updateDescription = (image: Image): Ref<Image> => {
    if (this.images.value) {
      this.images.value.images[image.id].description = image.description
    }
    this.updateImages()
    return toRef(this.images.value!.images, image.id)
  }

  getImages = (): Ref<Images | undefined> => {
    if (!this.event.value) {
      const unwatch = watch(this.event, async (e) => {
        this.load()
        unwatch()
      })
    } else {
      this.updateImages()
    }
    return this.images
  }

  getImageById = (id: number): Ref<Image | undefined> => {
    const image = ref<Image | undefined>(undefined)
    ;(async () => {
      image.value = await imageApi.getImageById(id)
    })()
    return image
  }

  updateImages = async (): Promise<Ref<Images | undefined>> => {
    if (this.event.value) {
      await this.load()
    }
    return this.images
  }
}

export const useImageRepository = (
  event: Ref<Event | undefined>
): ImageRepository => {
  return new ImageRepository(event)
}
