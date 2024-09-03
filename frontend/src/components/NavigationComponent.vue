<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/user">User</RouterLink>
    <RouterLink to="/event">Event</RouterLink>
  </nav>
</template>

<style scoped></style>
