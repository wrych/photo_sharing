<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/auth">Authentication</RouterLink>
    <RouterLink to="/events">Events</RouterLink>
  </nav>
</template>

<style scoped></style>
