import { EventStates, Events } from '../models/EventModel'
import { fetchJson, postJson } from './common'

const fetchEventStates = async (): Promise<EventStates> => {
  return EventStates.fromJSON(await fetchJson('/api/event/states'))
}

const fetchEvents = async (): Promise<Events> => {
  return Events.fromJSON(await fetchJson('/api/event/'))
}

const createEvent = async (title: string): Promise<Boolean> => {
  return await postJson('/api/event/new', { title: title })
}

export { fetchEventStates, fetchEvents, createEvent }
