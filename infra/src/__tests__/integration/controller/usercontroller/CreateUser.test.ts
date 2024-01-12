import { UserRequest } from '../../../../controller/UserController'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { app } from '../../../../configuration/expressConf'
import { MockUserApiFactory } from '../../../testtools/ControllerIntegrationTestTools'
import { User } from '@monorepo/domain'
import { v4 as uuidv4 } from 'uuid'

export const CreateUserTestOk = async (mockUserApiFactory: MockUserApiFactory) => {
  const userRequest: UserRequest = {
    username: faker.internet.userName()
  }

  const user = new User(userRequest.username, uuidv4())

  mockUserApiFactory.mockCreateUser(userRequest.username, user)

  const res = await request(app).post('/user').send(userRequest)

  expect(res.statusCode).toEqual(201)
  expect(res.body.userName).toEqual(userRequest.username)
}

export const UserNameNotAString = async () => {
  const res = await request(app).post('/user').send({
    username: 45
  })

  expect(res.statusCode).toEqual(400)
}
