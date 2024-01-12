import {
  ControllerApplicationTestContext,
  ControllerInitInjectionAndStartServer,
  MockGroupApiFactory,
  MockUserApiFactory
} from '../../testtools/ControllerIntegrationTestTools'
import { CreateGroupTestOk, GroupNameNotAString } from './groupcontroller/CreateGroup.test'
import { CreateUserTestOk, UserNameNotAString } from './usercontroller/CreateUser.test'
import { GetUserOk, UserNotExist } from './usercontroller/GetUser.test'

describe('Integration controller test wrapper', () => {
  let testContext: ControllerApplicationTestContext
  const mockUserApiFactory = new MockUserApiFactory()
  const mockGroupApiFactory = new MockGroupApiFactory()

  beforeAll(async () => {
    testContext = await ControllerInitInjectionAndStartServer(mockUserApiFactory.getMock(), mockGroupApiFactory.getMock())
  })

  afterAll(async () => {
    testContext.server.close()
  })

  describe('User controller', () => {
    describe('Get user', () => {
      beforeEach(() => {
        mockUserApiFactory.mockClear()
      })
      test('Get user ok', async () => GetUserOk(mockUserApiFactory))
      test('User not exist', async () => UserNotExist(mockUserApiFactory))
    })

    describe('Create user', () => {
      beforeEach(() => {
        mockUserApiFactory.mockClear()
      })
      test('Create user ok', async () => CreateUserTestOk(mockUserApiFactory))
      test('User name not a string', async () => UserNameNotAString())
    })
  })

  describe('Group controller', () => {
    describe('Create group', () => {
      beforeEach(() => {
        mockGroupApiFactory.mockClear()
      })
      test('Create group ok', async () => CreateGroupTestOk(mockGroupApiFactory))
      test('Group name not a string', async () => GroupNameNotAString())
    })
  })
})
