import { startExpressServer } from '../../configuration/expressConf'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { AppLogger, Group, User, UserApi } from '@monorepo/domain'
import { LoggerImpl } from '../../tools/Logger'
import { UserController } from '../../controller/UserController'
import { GroupApi } from '@monorepo/domain/src'
import { GroupController } from '../../controller/GroupController'

export interface ControllerApplicationTestContext {
  readonly server: Server<typeof IncomingMessage, typeof ServerResponse>
}

export const ControllerInitInjectionAndStartServer = async (userApi: UserApi, groupApi: GroupApi): Promise<ControllerApplicationTestContext> => {
  const appLogger: AppLogger = new LoggerImpl()

  //Init Controller
  UserController(appLogger, userApi)
  GroupController(appLogger, groupApi)

  const server = await startExpressServer(0, appLogger)
  return {
    server
  }
}

export class MockUserApiFactory {
  mockUserApi: jest.Mocked<UserApi> = {
    createUser: jest.fn(),
    getUser: jest.fn()
  }

  mockClear() {
    this.mockUserApi.createUser.mockClear()
    this.mockUserApi.getUser.mockClear()
  }

  mockCreateUser(username: string, user: User) {
    this.mockUserApi.createUser.mockImplementation(input => {
      if (input === username) {
        return Promise.resolve(user)
      } else {
        return Promise.reject(new Error('Mock fail'))
      }
    })
  }

  mockGetUserFail(userId: string) {
    this.mockUserApi.getUser.mockImplementation(input => {
      if (input === userId) {
        return Promise.reject(new Error('User not exist'))
      } else {
        return Promise.reject(new Error('Mock fail'))
      }
    })
  }

  mockGetUser(userId: string, userToFind: User) {
    this.mockUserApi.getUser.mockImplementation(input => {
      if (input === userId) {
        return Promise.resolve(userToFind)
      } else {
        return Promise.reject(new Error('Mock fail'))
      }
    })
  }

  getMock() {
    return this.mockUserApi
  }
}

export class MockGroupApiFactory {
  mockGroupApi: jest.Mocked<GroupApi> = {
    createGroup: jest.fn(),
    getGroup: jest.fn(),
    addUserToGroup: jest.fn()
  }

  mockClear() {
    this.mockGroupApi.createGroup.mockClear()
    this.mockGroupApi.getGroup.mockClear()
    this.mockGroupApi.addUserToGroup.mockClear()
  }

  mockCreateGroup(groupname: string, group: Group) {
    this.mockGroupApi.createGroup.mockImplementation(input => {
      if (input === groupname) {
        return Promise.resolve(group)
      } else {
        return Promise.reject(new Error('Mock fail'))
      }
    })
  }

  mockGetGroupFail(groupId: string) {
    this.mockGroupApi.getGroup.mockImplementation(input => {
      if (input === groupId) {
        return Promise.reject(new Error('Group not exist'))
      } else {
        return Promise.reject(new Error('Mock fail'))
      }
    })
  }

  mockGetGroup(groupId: string, groupToFind: Group) {
    this.mockGroupApi.getGroup.mockImplementation(input => {
      if (input === groupId) {
        return Promise.resolve(groupToFind)
      } else {
        return Promise.reject(new Error('Mock fail'))
      }
    })
  }

  getMock() {
    return this.mockGroupApi
  }
}
