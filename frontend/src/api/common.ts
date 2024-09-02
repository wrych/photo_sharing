import axios from 'axios'

export class BadResponseFormatError extends Error {
  constructor() {
    super('Malformed response')
  }
}

const fetchJson = async (resource: string): Promise<object> => {
  const response = await axios.get<object>(resource)
  if (!response.headers['content-type'].startsWith('application/json')) {
    throw new BadResponseFormatError()
  }
  return response.data
}

const postJson = async (resource: string, payload: {}) => {
  const res = await axios.post(resource, payload)
  return res.status === 200 ? true : false
}

export { postJson, fetchJson }
