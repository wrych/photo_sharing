<template>
  <div v-bind="$attrs" ref="container">
    <picture v-if="image && imageSources && orderedSources">
      <source :srcset="imageSources" :sizes="currentSize" />
      <img
        :src="orderedSources[0].href"
        :alt="props.image.description"
        loading="lazy"
      />
    </picture>
  </div>
</template>

<script setup lang="ts">
import { Image, ImageSource } from '@/models/ImageModel'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  image: Image
}>()

const currentSize = ref<string>('200px')
const container = ref(null)
const imageSources = ref<string | undefined>(undefined)
const orderedSources = ref<ImageSource[] | undefined>(undefined)
watch(
  () => props.image,
  () => {
    imageSources.value = undefined
    orderedSources.value = undefined
    orderedSources.value = Object.values(props.image.imageSources).sort(
      (a, b) => a.width - b.width
    )
    imageSources.value = orderedSources.value.reduce((src, image) => {
      return `${src}${image.href} ${image.width}w, `
    }, '')
  },
  { immediate: true }
)

const updateSize = (width: number) => {
  currentSize.value = `${width}px`
}

let observer: ResizeObserver | undefined = undefined

onMounted(() => {
  if (container.value) {
    observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        updateSize(entry.contentRect.width)
      }
    })
    observer.observe(container.value)
  }
})

onUnmounted(() => {
  if (observer && container.value) {
    observer.unobserve(container.value)
  }
})
</script>

<style scoped>
div {
  display: inline-block;
}
picture {
  height: 100%;
  border-radius: 5px;
}
img {
  height: 100%;
  width: auto;
  padding: 2px;
  border-radius: 5px;
}
</style>
