<template>
  <div class="event-container">
    <div v-if="event === undefined">Loading event...</div>
    <div v-else-if="event">
      <h2>{{ event.title }}</h2>
      <h3>Upload your Pictures</h3>
      <form @submit.prevent="upload">
        <input
          id="file"
          @change="fileChange"
          ref="fileInput"
          name="file"
          type="file"
          :disabled="uploading"
          accept=".png, .jpeg, .jpg, .webp"
          required
          autofocus
          multiple
        />
        <div v-if="uploads" class="uploads-wrapper">
          <div v-for="fileWithDescription of uploads" class="preview">
            <div
              class="overlay"
              :style="`width: ${100 - fileWithDescription.progress}%; display: ${uploading ? 'block' : 'none'};`"
            />
            <div class="preview-image-container">
              <img :src="getObject(fileWithDescription.file)" />
            </div>
            <input
              v-model="fileWithDescription.description"
              type="text"
              placeholder="Description"
              :disabled="uploading"
            />
          </div>
          <button v-if="!uploading" type="submit">Upload</button>
        </div>
      </form>
      <div v-if="images === undefined">Loading images...</div>
      <div v-else-if="images">
        <h3>Gallery</h3>
        <div class="images">
          <PictureComponent
            v-for="i in images.images"
            :image="i"
            class="picture"
          />
        </div>
      </div>
    </div>
    <div v-else>Unexpected state...</div>
  </div>
</template>

<script setup lang="ts">
import PictureComponent from '@/components/PictureComponent.vue'
import { useRoute } from 'vue-router'
import { useEventService } from '@/services/eventService'
import { ref } from 'vue'
import { useImageService } from '@/services/imageService'

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

const getObject = (file: File): string => {
  return URL.createObjectURL(file)
}

interface FileWithDescription {
  file: File
  description: string
  progress: number
}
const uploads = ref<FileWithDescription[] | null>(null)
const uploading = ref<boolean>(false)
const fileInput = ref<HTMLInputElement | null>(null)

const fileChange = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    if (!uploads.value) {
      uploads.value = []
    }
    const files: FileWithDescription[] = []
    Array.from(input.files).forEach((file) => {
      if (!uploads.value?.find((f) => f.file.name === file.name)) {
        files.push({ file: file, description: '', progress: 0 })
      }
    })
    uploads.value = files
  }
}

const upload = async (): Promise<void> => {
  if (!uploads.value || !event.value) {
    console.warn('No file or event')
    return
  }
  uploading.value = true
  const uploadPromises: Promise<void>[] = []
  for (const fileWithDescription of uploads.value) {
    uploadPromises.push(
      imageService.uploadImage(
        fileWithDescription.file,
        fileWithDescription.description,
        (e) => {
          if (e.progress) {
            fileWithDescription.progress = Math.round(e.progress * 100)
          }
        }
      )
    )
  }
  await Promise.all(uploadPromises)
  uploads.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  uploading.value = false
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

input::file-selector-button {
  background-color: var(--color-background-soft);
  width: 200px;
  color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-title);
  cursor: pointer;
}
input::file-selector-button:hover {
  background-color: var(--color-background-mute);
  color: var(--color-highlight);
  border-color: var(--color-highlight);
}

button {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-title);
  cursor: pointer;
}

button:hover {
  background-color: var(--color-background-mute);
  color: var(--color-highlight);
  border-color: var(--color-highlight);
}

.event-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px 10px;
  background-color: var(--color-background-soft);
}

.uploads-wrapper {
  max-width: 500px;
  width: 100%;
}

.picture {
  height: 250px;
}

.preview {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  padding: 10px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 5px;
  margin: 10px 0;
}

.preview span {
  grid-column-start: 1;
  grid-column-end: 3;
}

.preview-image-container {
  width: 100%;
  aspect-ratio: 3 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.preview input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-mute);
  color: var(--color-title);
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-highlight);
  opacity: 0.3;
  z-index: 1;
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
