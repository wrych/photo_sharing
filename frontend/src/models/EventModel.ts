import type { Images } from './ImageModel'

export class EventState {
  id: number
  label: string
  rankOrder: number

  constructor(id: number, label: string, rankOrder: number) {
    this.id = id
    this.label = label
    this.rankOrder = rankOrder
  }

  static fromJSON(json: {
    value: { id: number; label: string; orderRank: number }
  }): EventState {
    return new EventState(json.value.id, json.value.label, json.value.orderRank)
  }
}

export class EventStates {
  eventStates: Record<number, EventState>

  constructor(eventStates: Record<number, EventState>) {
    this.eventStates = eventStates
  }

  static fromJSON(json: {
    value: { value: { label: string; orderRank: number; id: number } }[]
  }): EventStates {
    return new EventStates(
      json.value.reduce((acc: Record<number, EventState>, eventState) => {
        acc[eventState.value.id] = EventState.fromJSON(eventState)
        return acc
      }, {})
    )
  }
}

export class Event {
  id: number
  title: string
  images: Images | undefined

  constructor(id: number, title: string) {
    this.id = id
    this.title = title
  }

  static fromJSON(json: { value: { id: number; title: string } }): Event {
    return new Event(json.value.id, json.value.title)
  }
}

export class Events {
  events: Record<number, Event>

  constructor(events: Record<number, Event>) {
    this.events = events
  }

  static fromJSON(json: {
    value: { value: { id: number; title: string } }[]
  }): Events {
    return new Events(
      json.value.reduce((acc: Record<number, Event>, event) => {
        acc[event.value.id] = Event.fromJSON(event)
        return acc
      }, {})
    )
  }
}
