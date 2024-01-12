import { User, UserSpi } from '@monorepo/domain'
import { UserEntity } from './models/UserEntity'
import { DataSource, Repository } from 'typeorm'
import { UserTransformer } from '../transformer/UserTransformer'

export class UserSpiImpl implements UserSpi {
  private readonly userRepository: Repository<UserEntity>

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(UserEntity)
  }

  async findByUserId(userId: string) {
    const result = await this.userRepository.findOneBy({
      userId: userId
    })
    if (result) {
      return UserTransformer().fromUserEntity(result)
    } else {
      return null
    }
  }

  async save(user: User) {
    const userEntity = UserTransformer().toUserEntity(user)
    const userEntitySaved = await this.userRepository.save(userEntity)
    return UserTransformer().fromUserEntity(userEntitySaved)
  }
}
