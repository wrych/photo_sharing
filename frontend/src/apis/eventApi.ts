import { Event, EventStates, Events } from '../models/EventModel'
import { getJson, postJson, deleteJson } from './common'

const getEventStates = async (): Promise<EventStates> => {
  return EventStates.fromJSON(await getJson('/api/event/states'))
}

const getEventById = async (id: number): Promise<Event> => {
  return Event.fromJSON(await getJson(`/api/event/${id}`))
}

const getEvents = async (): Promise<Events> => {
  return Events.fromJSON(await getJson('/api/event/'))
}

const createEvent = async (title: string): Promise<Event> => {
  return Event.fromJSON(await postJson('/api/event/new', { title: title }))
}

const deleteEvent = async (event: Event): Promise<{}> => {
  return await deleteJson(`/api/event/${event.id}`)
}

export { getEventStates, getEvents, getEventById, createEvent, deleteEvent }
