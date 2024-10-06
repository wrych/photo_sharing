export class AuthUser {
  username: string
  id: number

  constructor(id: number, username: string) {
    this.username = username
    this.id = id
  }

  static fromJSON(json: {
    value: { id: number; username: string }
  }): AuthUser | null {
    return json.value ? new AuthUser(json.value.id, json.value.username) : null
  }
}
