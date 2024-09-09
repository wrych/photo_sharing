export class Image {
  id: number
  description: string
  eventId: number
  imageSources: ImageSource[]

  constructor(
    id: number,
    description: string,
    eventId: number,
    imageSources: ImageSource[]
  ) {
    this.id = id
    this.description = description
    this.eventId = eventId
    this.imageSources = imageSources
  }

  static fromJSON(json: {
    value: {
      id: number
      description: string
      eventId: number
      imageSources: ImageSource[]
    }
  }): Image {
    return new Image(
      json.value.id,
      json.value.description,
      json.value.eventId,
      json.value.imageSources.map((is) => ImageSource.fromJSON(is))
    )
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
