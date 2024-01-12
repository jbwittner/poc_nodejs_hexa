import { User } from '../model'

export interface UserApi {
  createUser: (username: string) => Promise<User>
  getUser: (userId: string) => Promise<User>
}
