export class EventState {
  label: string
  rankOrder: number

  constructor(label: string, rankOrder: number) {
    this.label = label
    this.rankOrder = rankOrder
  }

  static fromJSON(json: {
    value: { label: string; orderRank: number }
  }): EventState {
    return new EventState(json.value.label, json.value.orderRank)
  }
}

export class EventStates {
  eventStates: EventState[]

  constructor(eventStates: EventState[]) {
    this.eventStates = eventStates
  }

  static fromJSON(json: {
    value: { label: string; rankOrder: number }[]
  }): EventStates {
    return new EventStates(json.value.map((es) => EventState.fromJSON(es)))
  }
}

export class Event {
  id: number
  title: string

  constructor(id: number, title: string) {
    this.id = id
    this.title = title
  }

  static fromJSON(json: { value: { id: number; title: string } }): Event {
    return new Event(json.value.id, json.value.title)
  }
}

export class Events {
  events: Event[]

  constructor(events: Event[]) {
    this.events = events
  }

  static fromJSON(json: { value: { id: number; title: string }[] }): Events {
    return new Events(json.value.map((e) => Event.fromJSON(e)))
  }
}
