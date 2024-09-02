<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { EventStates, Events } from '@/models/EventModel'
import { createEvent, fetchEventStates, fetchEvents } from '@/api/eventService'

const eventStates = ref<EventStates | undefined>(undefined)
const events = ref<Events | undefined>(undefined)
const eventForm = ref({ title: '' })

onMounted(async () => {
  eventStates.value = await fetchEventStates()
  events.value = await fetchEvents()
})
const create = async () => {
  const res = await createEvent(eventForm.value.title)
  if (res) {
    eventForm.value.title = ''
  }
}
</script>

<template>
  <div>
    <h1>API Event States</h1>
    <div v-if="eventStates">
      <ul>
        <li v-for="es in eventStates.eventStates">
          {{ es.rankOrder }}: {{ es.label }}
        </li>
      </ul>
    </div>
    <div v-else>Loading...</div>
    <div v-if="events">
      <ul>
        <li v-for="e in events.events">{{ e.id }}: {{ e.title }}</li>
      </ul>
    </div>
    <div v-else>Loading...</div>
    <div>
      <form @submit.prevent="create">
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
