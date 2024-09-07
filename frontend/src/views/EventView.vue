<template>
  <div v-if="event">
    <h2>Event Details for {{ event.id }}: {{ event.title }}</h2>
  </div>
  <div v-else-if="event === undefined">Loading event information...</div>
  <div v-else>Unexpected state...</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useEventService } from '@/services/eventService'

const route = useRoute()
const eventService = useEventService()

const event = eventService.getEventById(parseInt(route.params.id))
</script>
