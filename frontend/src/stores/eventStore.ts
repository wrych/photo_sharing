import { Events, EventStates } from '@/models/EventModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventStore = defineStore('user', () => {
  const isProcessing = ref<boolean>(false)
  const events = ref<Events | undefined>(undefined)
  const eventStates = ref<EventStates | undefined>(undefined)

  const getEventById = (id: number) => {
    return events.value?.events.find((e) => e.id === id)
  }

  return {
    isProcessing,
    events,
    eventStates,
    getEventById
  }
})
