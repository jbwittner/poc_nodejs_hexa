import request from 'supertest'
import { app } from '../../../../configuration/expressConf'
import { v4 as uuidv4 } from 'uuid'
import { MockUserApiFactory } from '../../../testtools/ControllerIntegrationTestTools'
import { User } from '@monorepo/domain'
import { faker } from '@faker-js/faker'

export const GetUserOk = async (mockUserApiFactory: MockUserApiFactory) => {
  const user = new User(faker.internet.userName(), uuidv4())
  mockUserApiFactory.mockGetUser(user.userId, user)

  const res = await request(app).get('/user/' + user.userId)

  expect(res.status).toEqual(200)
  expect(res.body.userName).toEqual(user.username)
  expect(res.body.userId).toEqual(user.userId)
}

export const UserNotExist = async (mockUserApiFactory: MockUserApiFactory) => {
  const userId = uuidv4()
  mockUserApiFactory.mockGetUserFail(userId)
  const res = await request(app).get('/user/' + userId)

  expect(res.statusCode).toEqual(500)
}
