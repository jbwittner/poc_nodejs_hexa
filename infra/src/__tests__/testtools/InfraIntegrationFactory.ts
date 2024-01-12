import { Faker } from '@faker-js/faker'
import { InfraUnitFactory } from './InfraUnitFactory'
import { UserSpi, User } from '@monorepo/domain'

export const InfraIntegrationFactory = (faker: Faker, userSpi: UserSpi) => {
  const infraUnitFactory = InfraUnitFactory(faker)

  const getUser = async () => {
    const user: User = infraUnitFactory.getUser()
    return userSpi.save(user)
  }

  return {
    getUser
  }
}
