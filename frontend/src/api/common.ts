export class BadResponseFormatError extends Error {
  constructor() {
    super('Malformed response')
  }
}
