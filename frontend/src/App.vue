<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationComponent from './components/NavigationComponent.vue'
</script>

<template>
  <header v-if="!$route.path.startsWith('/event/')">
    <NavigationComponent />
  </header>
  <RouterView />
</template>

<style scoped></style>
