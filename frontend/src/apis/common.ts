import axios, { type AxiosResponse } from 'axios'

export class BadResponseFormatError extends Error {
  constructor(received: string, expected: string) {
    super(`Malformed response (received: ${received}, expected: ${expected})`)
  }
}

const checkContentType = (
  res: AxiosResponse,
  expected: string = 'application/json'
): void => {
  if (!res.headers['content-type'].startsWith(expected)) {
    throw new BadResponseFormatError(res.headers['content-type'], expected)
  }
}

const getJson = async (resource: string): Promise<{}> => {
  const res = await axios.get<{}>(resource)
  checkContentType(res)
  return res.data
}

const postJson = async (
  resource: string,
  payload: {} | null = null
): Promise<{}> => {
  const res = await axios.post<{}>(resource, payload)
  checkContentType(res)
  return res.data
}

const deleteJson = async (resource: string): Promise<{}> => {
  const res = await axios.delete<{}>(resource)
  checkContentType(res)
  return res.data
}
export { postJson, getJson, deleteJson }
