<template>
  <div v-if="event === undefined">Loading event...</div>
  <div v-else-if="event">
    <h2>{{ event.title }}</h2>
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
    <hr />
    <div v-if="images === undefined">Loading images...</div>
    <div v-else-if="images">
      <h3>Images</h3>
      <PictureComponent v-for="i in images.images" :image="i" class="picture" />
    </div>
  </div>
  <div v-else>Unexpected state...</div>
</template>

<script setup lang="ts">
import PictureComponent from '@/components/PictureComponent.vue'
import { useRoute } from 'vue-router'
import { useEventService } from '@/services/eventService'
import { ref, watch, type Ref } from 'vue'
import { useImageService } from '@/services/imageService'

const route = useRoute()
const eventService = useEventService()

const event = eventService.getEventById(parseInt(route.params.id))

const imageService = useImageService(event)
const images = imageService.getImages()

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
  const upload = imageService.uploadImage(
    uploadForm.value.selectedFile,
    uploadForm.value.description,
    (e) => {
      console.log(e)
    }
  )
  await upload
  uploadForm.value.selectedFile = null
  uploadForm.value.description = ''
}
</script>

<style scoped>
.picture {
  width: 300px;
}
</style>
