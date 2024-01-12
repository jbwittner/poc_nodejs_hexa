import { faker } from '@faker-js/faker'
import { UserTransformer } from '../../../../transformer/UserTransformer'
import { InfraUnitFactory } from '../../../testtools/InfraUnitFactory'

describe('Test toUserEntity method', () => {
  const userTransformer = UserTransformer()
  const infraUnitFactory = InfraUnitFactory(faker)

  test('Ok', () => {
    const user = infraUnitFactory.getUser()
    const toUserEntity = userTransformer.toUserEntity(user)
    expect(toUserEntity.userId).toBe(user.userId)
    expect(toUserEntity.userName).toBe(user.username)
  })
})
