<template>
  <div class="event-container">
    <div v-if="event">
      <RouterLink v-if="route.params.imageId && images" :to="`/event/${route.params.id}`">
        <div class="zoom-overlay"></div>
        <div class="zoom-container">
          <PictureComponent :image="images.images[parseInt(route.params.imageId as string)]" :zoom="true"
            class="zoom-image" />
        </div>
      </RouterLink>
      <div class="upload-button" @click="fileInput?.click();">
        <input id="selectedFile" @change="fileChange" ref="fileInput" name="file" type="file"
          accept="image/png, image/jpeg, image/webp, image/gif" title="images" multiple />
        <div>+</div>
      </div>
      <h2>{{ event.title }}</h2>
      <div class="uploads-wrapper">
        <ImageUpload v-for="[index, fileToUpload] in Object.entries(uploadImages)" :file="fileToUpload"
          :service="imageService" @close="removeUpload(index)" :key="fileToUpload.name" />
      </div>
      <div v-if="images === undefined">Loading images...</div>
      <div v-else-if="images">
        <div class="images">
          <RouterLink v-for="i in orderedImages" :to="`/event/${route.params.id}/zoom/${i.id}`">
            <PictureComponent :image="i" class="picture" :key="i.id" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PictureComponent from '@/components/PictureComponent.vue'
import { useRoute } from 'vue-router'
import { useEventService } from '@/services/eventService'
import { computed, ref } from 'vue'
import { useImageService } from '@/services/imageService'
import ImageUpload from '@/components/ImageUpload.vue'

const route = useRoute()
const eventService = useEventService()

if (!route.params.id) {
  throw new Error('No event id provided!')
}
const event = eventService.getEventById(
  parseInt(
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  )
)

const imageService = useImageService(event)
const images = imageService.getImages()
const orderedImages = computed(() => {
  if (!images.value) {
    return []
  }
  return Object.values(images.value.images).sort((a, b) => b.id - a.id)
})

const uploadImages = ref<Record<number, File>>({})
let uploadId = 0
const fileInput = ref<HTMLInputElement | null>(null)

const fileChange = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    Array.from(input.files).forEach((file) => {
      uploadImages.value[uploadId++] = file
    })
    input.value = ''
  }
}

const removeUpload = (index: string): void => {
  delete uploadImages.value[parseInt(index)]
}
</script>

<style scoped>
h2 {
  color: var(--color-highlight);
  font-size: xx-large;
}

h3 {
  margin: 20px 0 10px 0;
}

#selectedFile {
  display: none;
}

.upload-button {
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  background-color: var(--color-background-mute);
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid var(--color-border);
}

.upload-button div {
  font-size: 4rem;
  line-height: 40px;
  text-align: center;
  color: var(--color-text);
}

.upload-button:hover {
  border-color: var(--color-highlight);
}

.upload-button div:hover {
  color: var(--color-highlight);
}

.event-container {
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px 10px;
  min-height: 100vh;
  background-color: var(--color-background-soft);
}

.uploads-wrapper {
  width: 100%;
}

.picture {
  height: 200px;
  max-width: 400px;
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  opacity: 0.5;
  z-index: 2;
}

.zoom-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  height: 90vh;
  width: 90vw;
  max-width: 1024px;
  object-fit: scale-down;
  display: grid;
  align-content: center;
  justify-content: center;
}

.zoom-image {
  height: 100%;
  width: 100%;
  margin: auto;
}

@media screen and (min-width: 1024px) {
  .picture {
    height: 250px;
    max-width: 500px;
  }
}
</style>
