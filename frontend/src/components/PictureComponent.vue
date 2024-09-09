<template>
  <picture>
    <!-- Source for small screens -->
    <source :srcset="image.small" media="(max-width: 600px)" />
    <!-- Source for intermediate screens -->
    <source :srcset="image.intermediate" media="(max-width: 1200px)" />
    <!-- Fallback source for original size -->
    <img :src="image.original" v-bind="$attrs" />
  </picture>
</template>

<script setup lang="ts">
interface ImageSources {
  small: string
  intermediate: string
  original: string
}

// Define props using defineProps
const props = defineProps<{
  image: ImageSources
}>()
</script>
