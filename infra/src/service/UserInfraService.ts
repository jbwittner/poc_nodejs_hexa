import { AppLogger, UserApi, UserDomainService, UserSpi } from '@monorepo/domain'

export class UserInfraService implements UserApi {
  private userApi: UserApi
  private logger: AppLogger

  constructor(logger: AppLogger, userSpi: UserSpi) {
    this.logger = logger
    this.userApi = new UserDomainService(userSpi)
  }
  createUser(username: string) {
    this.logger.info('createUser')
    return this.userApi.createUser(username)
  }

  getUser(userId: string) {
    this.logger.info('getUser')
    return this.userApi.getUser(userId)
  }
}
