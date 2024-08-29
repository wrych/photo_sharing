export class User {
  username: string
  id: number

  constructor(id: number, username: string) {
    this.username = username
    this.id = id
  }

  static fromJSON(json: { user: { id: number; username: string } }) {
    return new User(json.user.id, json.user.username)
  }
}

export class AuthentificationState {
  value: string

  constructor(value: string) {
    this.value = value
  }

  static fromJSON(json: { value: string }) {
    return new AuthentificationState(json.value)
  }
}
