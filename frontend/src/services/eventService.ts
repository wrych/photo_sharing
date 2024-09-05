import type { Event } from '@/models/EventModel'

class EventService {
  private repository = useEventRepository()

  getEvent = (id: number): Event | null => {
    return this.repository.getUser()
  }
}

let eventService: EventService | null = null

export const useAuthService = (): EventService => {
  if (!eventService) {
    eventService = new EventService()
  }
  return eventService
}
