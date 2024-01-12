import { SpiApplicationTestContext } from '../../../testtools/SpiIntegrationTestTools'
import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { UserEntity } from '../../../../spi/models/UserEntity'

export const FindUserTestOk = async (testContext: SpiApplicationTestContext) => {
  const userId = uuidv4()
  const userEntity = new UserEntity(userId, faker.internet.userName())
  await testContext.repositories.userRepository.save(userEntity)

  const userFinded = await testContext.userSpi.findByUserId(userId)

  expect(userFinded).not.toBeNull()
  expect(userFinded!.userId).toBe(userEntity.userId)
  expect(userFinded!.username).toBe(userEntity.userName)
}

export const UserNotExistTest = async (testContext: SpiApplicationTestContext) => {
  const userId = uuidv4()
  const userFinded = await testContext.userSpi.findByUserId(userId)

  expect(userFinded).toBeNull()
}
