import { toRef, type Ref } from 'vue'

import { useEventStore } from '@/stores/eventStore'
import { logStateChange } from './common'
import * as eventApi from '@/apis/eventApi'
import { Event, Events, EventStates } from '@/models/EventModel'

class EventRepository {
  private store = useEventStore()

  logStateChange<T extends (...args: any[]) => ReturnType<T>>(fn: T) {
    return logStateChange(this.store, fn)
  }

  initEvents = () => {
    if (!this.store.events) {
      this.store.events = { events: {} }
    }
  }

  updateEventById = this.logStateChange(
    async (id: number): Promise<Event | undefined> => {
      this.initEvents()
      this.store.events.events[id] = await eventApi.getEventById(id)
      return toRef(this.store.events.events, id)
    }
  )

  updateEvent = this.logStateChange((e: Event): Ref<Event | undefined> => {
    this.initEvents()
    this.store.events.events[e.id] = e
    return toRef(this.store.events.events, e.id)
  })

  getEventById = (id: number): Ref<Event | undefined> => {
    if (!this.store.events?.events[id]) {
      this.logStateChange(this.updateEventById)(id)
    }
    return toRef(this.store.events.events, id)
  }

  updateEvents = this.logStateChange(async (): Promise<void> => {
    this.store.events = await eventApi.getEvents()
  })

  getEvents = (): Ref<Events | undefined> => {
    this.logStateChange(this.updateEvents)()
    return toRef(this.store, 'events')
  }

  updateEventStates = this.logStateChange(async (): Promise<void> => {
    this.store.eventStates = await eventApi.getEventStates()
  })

  getEventStates = (): Ref<EventStates | undefined> => {
    if (!this.store.eventStates) {
      this.logStateChange(this.updateEventStates)()
    }
    return toRef(this.store, 'eventStates')
  }
}

let eventRepository: EventRepository | null = null

export const useEventRepository = (): EventRepository => {
  if (!eventRepository) {
    eventRepository = new EventRepository()
  }
  return eventRepository
}
