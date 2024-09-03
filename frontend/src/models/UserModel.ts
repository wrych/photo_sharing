export class User {
  username: string
  id: number

  constructor(id: number, username: string) {
    this.username = username
    this.id = id
  }

  static fromJSON(json: { value: { id: number; username: string } }) {
    return new User(json.value.id, json.value.username)
  }
}
