<template>
  <div v-bind="$attrs" ref="container">
    <picture v-if="image && imageSources && orderedSources">
      <source :srcset="imageSources" :sizes="currentSize" />
      <img :src="orderedSources[0].href" :alt="props.image.description" loading="lazy"
        :style="props.zoom ? `max-height: 100%; max-width: 100%` : `height: 100%;`" />
    </picture>
  </div>
</template>

<script setup lang="ts">
import { Image, ImageSource } from '@/models/ImageModel'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  image: { type: Image, required: true },
  zoom: {
    type: Boolean,
    default: false
  }
})

const container = ref<HTMLElement | null>(null)
const imageSources = ref<string | undefined>(undefined)
const orderedSources = ref<ImageSource[] | undefined>(undefined)
const currentSize = ref<string>("200px")
watch(
  () => props.image,
  () => {
    orderedSources.value = Object.values(props.image.imageSources).sort(
      (a, b) => a.width - b.width
    )
    imageSources.value = orderedSources.value.reduce((src, image) => {
      return `${src}${image.href} ${image.width}w, `
    }, '')
  },
  { immediate: true }
)

const resizeObserver = new ResizeObserver(function () {
  currentSize.value = `${container.value?.clientWidth}px`
});

onMounted(() => {
  if (!props.zoom) {
    resizeObserver.observe(container.value!);
  } else {
    currentSize.value = "1024px"
  }
})
</script>

<style scoped>
div {
  display: inline-block;
  overflow: hidden;
  border-radius: 10px;
}

picture {
  height: 100%;
}

img {
  width: auto;
  padding: 2px;
  border-radius: 5px;
}
</style>
