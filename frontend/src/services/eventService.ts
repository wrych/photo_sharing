import type { Event, Events, EventStates } from '@/models/EventModel'
import { useEventRepository } from '@/repositories/eventRepository'
import type { Ref } from 'vue'
import * as eventApi from '@/apis/eventApi'

class EventService {
  private repository = useEventRepository()

  getEventById = (id: number): Ref<Event | undefined> => {
    return this.repository.getEventById(id)
  }

  createEvent = async (title: string): Promise<Ref<Event | undefined>> => {
    const newEvent = await this.repository.logStateChange(eventApi.createEvent)(
      title
    )
    return this.repository.updateEvent(newEvent)
  }

  deleteEvent = async (e: Event): Promise<void> => {
    await this.repository.logStateChange(eventApi.deleteEvent)(e)
    this.repository.updateEvents()
  }

  getEvents = (): Ref<Events | undefined> => {
    return this.repository.getEvents()
  }

  getEventStates = (): Ref<EventStates | undefined> => {
    return this.repository.getEventStates()
  }
}

let eventService: EventService | null = null

export const useEventService = (): EventService => {
  if (!eventService) {
    eventService = new EventService()
  }
  return eventService
}
