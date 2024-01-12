import { v4 as uuidv4 } from 'uuid'
import { UserApi } from '../api'
import { UserSpi } from '../spi'
import { User } from '../model'

export class UserDomainService implements UserApi {
  private userSpi: UserSpi

  constructor(userSpi: UserSpi) {
    this.userSpi = userSpi
  }

  async getUser(userId: string) {
    const finded = await this.userSpi.findByUserId(userId)
    if (finded === null) {
      throw new Error('User not exist')
    }
    return finded
  }

  async createUser(username: string) {
    const userId = uuidv4()
    const user = new User(username, userId)
    return await this.userSpi.save(user)
  }
}
