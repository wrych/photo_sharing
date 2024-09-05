import type { Ref } from 'vue'

import { useEventStore } from '@/stores/eventStore'
import { logStateChange } from './common'
import * as eventApi from '@/apis/eventApi'


class EventRepository {
  private store = useEventStore()

  logStateChange<T extends (...args: any[]) => ReturnType<T>>(fn: T) {
    return logStateChange(this.store, fn)
  } 
  
  updateEvent = this.logStateChange(async (): Promise<void> => {
    this.store.events = await eventApi.getEvents()
  })

  getEvent = (id: number): Ref<Event | null> => {
    if (this.store.getEventById(id) === undefined) {
      this.logStateChange(this.getEvent)(id)
    }
    return toRef(this.store, 'user')
  }

}

let authRepository: AuthRepository | null = null

export const useAuthRepository = (): AuthRepository => {
  if (!authRepository) {
    authRepository = new AuthRepository()
  }
  return authRepository