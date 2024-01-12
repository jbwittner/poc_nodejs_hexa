import { User } from '@monorepo/domain'
import { UserDTO } from '../controller/UserController'
import { UserEntity } from '../spi/models/UserEntity'

export const UserTransformer = () => {
  const toUserDTO = (user: User): UserDTO => {
    return {
      userId: user.userId,
      userName: user.username
    }
  }

  const toUserEntity = (user: User): UserEntity => {
    return new UserEntity(user.userId, user.username)
  }

  const fromUserEntity = (userEntity: UserEntity): User => {
    return new User(userEntity.userName, userEntity.userId)
  }

  return {
    toUserDTO,
    toUserEntity,
    fromUserEntity
  }
}
