import { User } from '../model'

export interface UserSpi {
  save: (user: User) => Promise<User>
  findByUserId: (userId: string) => Promise<User | null>
}
