<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { Event } from '@/models/EventModel'
import * as eventService from '@/services/eventService'
import { useEventStore } from '@/stores/eventStore'

const eventStore = useEventStore()

const eventForm = ref({
  title: ''
})

onMounted(async () => {
  await eventService.getEventStates()
  await eventService.getEvents()
})

const createEvent = async () => {
  await eventService.createEvent(eventForm.value.title)
}

const deleteEvent = async (event: Event) => {
  await eventService.deleteEvent(event)
}
</script>

<template>
  <div>
    <h1>API Event States</h1>
    <div v-if="eventStore.eventStates">
      <ul>
        <li v-for="es in eventStore.eventStates.eventStates">
          {{ es.rankOrder }}: {{ es.label }}
        </li>
      </ul>
    </div>
    <div v-else>Loading Events States...</div>
    <div v-if="eventStore.events">
      <ul>
        <li v-for="e in eventStore.events.events">
          {{ e.id }}:
          <router-link :to="{ name: 'Event Detail', params: { id: e.id } }">
            {{ e.title }}
          </router-link>
          <form @submit.prevent="deleteEvent(e)">
            <button type="submit">x</button>
          </form>
        </li>
      </ul>
    </div>
    <div v-else>Loading Events...</div>
    <div>
      <form @submit.prevent="createEvent">
        <label for="event-title">Event Title</label>
        <input
          id="event-title"
          v-model="eventForm.title"
          name="event-title"
          type="text"
          placeholder="Some Event!"
          required
          autofocus
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
