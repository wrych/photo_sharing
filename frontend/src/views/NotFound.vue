<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const fullPath = route.fullPath
</script>

<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>
      The page <strong>{{ fullPath }}</strong> does not exist.
    </p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>
