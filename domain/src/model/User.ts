export class User {
  readonly username: string
  readonly userId: string

  constructor(username: string, userId: string) {
    this.username = username
    this.userId = userId
  }
}
