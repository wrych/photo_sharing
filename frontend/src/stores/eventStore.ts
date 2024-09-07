import { Events, EventStates } from '@/models/EventModel'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventStore = defineStore('event', () => {
  const isProcessing = ref<boolean>(false)
  const events = ref<Events | undefined>(undefined)
  const eventStates = ref<EventStates | undefined>(undefined)

  return {
    isProcessing,
    events,
    eventStates
  }
})
