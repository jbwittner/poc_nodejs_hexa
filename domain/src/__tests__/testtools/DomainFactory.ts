import { Faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { User } from '../../model'

export const DomainFactory = (faker: Faker) => {
  const getUser = () => {
    const userName = faker.internet.userName()
    const userId = uuidv4()
    return new User(userName, userId)
  }

  return {
    getUser
  }
}
