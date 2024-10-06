<template>
  <div class="event-container">
    <div v-if="event === undefined">Loading event...</div>
    <div v-else-if="event">
      <h2>{{ event.title }}</h2>
      <h3>Upload your Pictures</h3>
      <input
        id="file"
        @change="fileChange"
        ref="fileInput"
        name="file"
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        title="images"
        required
        autofocus
        multiple
      />
      <div class="uploads-wrapper">
        <ImageUpload
          v-for="fileToUpload in uploadImages"
          :file="fileToUpload"
          :service="imageService"
        />
      </div>
      <div v-if="images === undefined">Loading images...</div>
      <div v-else-if="images">
        <h3>Gallery</h3>
        <div class="images">
          <PictureComponent
            v-for="i in orderedImages"
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

const uploadImages = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const fileChange = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    uploadImages.value = Array.from(input.files)
    input.value = ''
  }
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
  height: 200px;
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

@media screen and (min-width: 1024px) {
  .picture {
    height: 250px;
  }
}
</style>
