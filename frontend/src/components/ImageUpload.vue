<template>
  <div class="preview">
    <div
      class="overlay"
      :style="`width: ${progress}%; display: ${uploading ? 'block' : 'none'};`"
    />
    <div class="preview-image-container">
      <img :src="getObject(props.file)" />
    </div>
    <input
      v-model="description"
      type="text"
      placeholder="Description"
      @change="updateDescription"
    />
  </div>
</template>

<script setup lang="ts">
import { Image } from '@/models/ImageModel'
import { ImageService } from '@/services/imageService'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  file: { type: File, required: true },
  service: { type: ImageService, required: true }
})

const getObject = (file: File): string => {
  return URL.createObjectURL(file)
}

const progress = ref<number>(0)
const uploading = ref<boolean>(false)
const description = ref<string>('')
const image = ref<Image | undefined>(undefined)

const upload = async (): Promise<void> => {
  uploading.value = true
  image.value = (
    await props.service.uploadImage(props.file, '', (e) => {
      if (e.progress) {
        progress.value = Math.round(e.progress * 100)
      }
    })
  ).value
  uploading.value = false
}

const updateDescription = (): void => {
  if (image.value) {
    image.value.description = description.value
    props.service.updateDescription(image.value)
  } else {
    const unwatch = watch(image, (newImage) => {
      if (newImage) {
        newImage.description = description.value
        props.service.updateDescription(newImage)
        unwatch()
      }
    })
  }
}

onMounted(async () => {
  upload()
})
</script>

<style scoped>
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
  bottom: 0;
  left: 0;
  width: 0%;
  height: 5%;
  background-color: var(--color-highlight);
}
</style>
