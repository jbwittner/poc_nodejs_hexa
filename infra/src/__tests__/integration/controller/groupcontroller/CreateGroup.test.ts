import { GroupRequest } from '../../../../controller/GroupController'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { app } from '../../../../configuration/expressConf'
import { MockGroupApiFactory } from '../../../testtools/ControllerIntegrationTestTools'
import { Group } from '@monorepo/domain'
import { v4 as uuidv4 } from 'uuid'

export const CreateGroupTestOk = async (mockGroupApiFactory: MockGroupApiFactory) => {
  const groupRequest: GroupRequest = {
    groupname: faker.internet.userName()
  }

  const group = new Group(groupRequest.groupname, uuidv4())

  mockGroupApiFactory.mockCreateGroup(groupRequest.groupname, group)

  const res = await request(app).post('/group').send(groupRequest)

  expect(res.statusCode).toEqual(201)
  expect(res.body.groupName).toEqual(groupRequest.groupname)
}

export const GroupNameNotAString = async () => {
  const res = await request(app).post('/group').send({
    groupname: 45
  })

  expect(res.statusCode).toEqual(400)
}
