<template>
  <div v-bind="$attrs" ref="container">
    <picture v-if="image">
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
import { Image } from '@/models/ImageModel'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  image: Image
}>()

const currentSize = ref<string>('200px')
const container = ref(null)
const orderedSources = Object.values(props.image.imageSources).sort(
  (a, b) => a.width - b.width
)
const imageSources = orderedSources.reduce((src, image) => {
  return `${src}${image.href} ${image.width}w, `
}, '')

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
picture {
  width: 100%;
}
img {
  width: 100%;
  height: auto;
}
</style>
