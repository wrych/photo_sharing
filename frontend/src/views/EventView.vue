<template>
  <div v-if="event">
    <h2>Event Details for {{ event.id }}: {{ event.title }}</h2>
    <form @submit.prevent="upload">
      <label for="file">Picture</label>
      <input
        id="file"
        @change="fileChange"
        name="file"
        type="file"
        required
        autofocus
      />
      <label for="description">Description</label>
      <input
        id="description"
        name="description"
        v-model="uploadForm.description"
        type="text"
      />
      <button type="submit">Upload</button>
    </form>
  </div>
  <div v-else-if="event === undefined">Loading event information...</div>
  <div v-else>Unexpected state...</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useEventService } from '@/services/eventService'
import { ref, type Ref } from 'vue'
import { useImageService } from '@/services/imageService'

const route = useRoute()
const eventService = useEventService()
const imageService = useImageService()

const event = eventService.getEventById(parseInt(route.params.id))
const uploadForm: Ref<{ selectedFile: File | null; description: string }> = ref(
  {
    selectedFile: null,
    description: ''
  }
)

const fileChange = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    uploadForm.value.selectedFile = input.files[0]
  }
}

const upload = async (): Promise<void> => {
  if (!uploadForm.value.selectedFile || !event.value) {
    throw Error('unexpected error')
  }
  imageService.uploadImage(
    uploadForm.value.selectedFile,
    uploadForm.value.description,
    event.value,
    (e) => {}
  )
}
</script>
