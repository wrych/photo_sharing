export interface ImageDTO {
  value: {
    id: number
    description: string
    eventId: number
    image_sources: ImageSourceDTO[]
  }
}

export class Image {
  id: number
  description: string
  eventId: number
  imageSources: Record<number, ImageSource>

  constructor(
    id: number,
    description: string,
    eventId: number,
    imageSources: Record<number, ImageSource>
  ) {
    this.id = id
    this.description = description
    this.eventId = eventId
    this.imageSources = imageSources
  }

  static fromJSON(json: ImageDTO): Image {
    return new Image(
      json.value.id,
      json.value.description,
      json.value.eventId,
      json.value.image_sources.reduce(
        (acc: Record<number, ImageSource>, is) => {
          acc[is.value.id] = ImageSource.fromJSON(is)
          return acc
        },
        {}
      )
    )
  }
}

export interface ImageSourceDTO {
  value: {
    id: number
    href: string
    width: number
    height: number
    isOriginal: boolean
  }
}

export class ImageSource {
  id: number
  href: string
  width: number
  height: number
  isOriginal: boolean

  constructor(
    id: number,
    href: string,
    width: number,
    height: number,
    isOriginal: boolean
  ) {
    this.id = id
    this.href = href
    this.width = width
    this.height = height
    this.isOriginal = isOriginal
  }

  static fromJSON(json: ImageSourceDTO): ImageSource {
    return new ImageSource(
      json.value.id,
      json.value.href,
      json.value.width,
      json.value.height,
      json.value.isOriginal
    )
  }
}

export interface ImagesDTO {
  value: ImageDTO[]
}

export class Images {
  images: Record<number, Image>

  constructor(images: Record<number, Image>) {
    this.images = images
  }

  static fromJSON(json: ImagesDTO): Images {
    return new Images(
      json.value.reduce((acc: Record<number, Image>, image) => {
        acc[image.value.id] = Image.fromJSON(image)
        return acc
      }, {})
    )
  }
}
