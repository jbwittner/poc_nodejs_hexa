import { Faker } from '@faker-js/faker'
import { User } from '@monorepo/domain'
import { v4 as uuidv4 } from 'uuid'

export const InfraUnitFactory = (faker: Faker) => {
  const getUser = () => {
    const userName = faker.internet.userName()
    const userId = uuidv4()
    return new User(userName, userId)
  }

  return {
    getUser
  }
}
