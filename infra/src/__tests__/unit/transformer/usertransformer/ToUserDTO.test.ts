import { faker } from '@faker-js/faker'
import { UserTransformer } from '../../../../transformer/UserTransformer'
import { InfraUnitFactory } from '../../../testtools/InfraUnitFactory'

describe('Test toUserDTO method', () => {
  const userTransformer = UserTransformer()
  const infraUnitFactory = InfraUnitFactory(faker)

  test('Ok', () => {
    const user = infraUnitFactory.getUser()
    const userDTO = userTransformer.toUserDTO(user)
    expect(userDTO.userId).toBe(user.userId)
    expect(userDTO.userName).toBe(user.username)
  })
})
