import { faker } from '@faker-js/faker'
import { UserTransformer } from '../../../../transformer/UserTransformer'
import { UserEntity } from '../../../../spi/models/UserEntity'
import { v4 as uuidv4 } from 'uuid'

describe('Test toUserEntity method', () => {
  const userTransformer = UserTransformer()

  test('Ok', () => {
    const userEntity = new UserEntity(uuidv4(), faker.internet.userName())
    const user = userTransformer.fromUserEntity(userEntity)
    expect(user.userId).toBe(userEntity.userId)
    expect(user.username).toBe(userEntity.userName)
  })
})
