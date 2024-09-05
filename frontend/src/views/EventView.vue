<template>
  <div>
    <h2>Event Details for {{ event.id }}: {{ event.title }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useEventService } from '@/stores/eventService'

const route = useRoute()
const eventService = useEventService()

const event = eventService.getEvent(route.params.id)
</script>
