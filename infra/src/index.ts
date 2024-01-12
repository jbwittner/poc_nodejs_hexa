import { AppLogger, GroupSpi, UserGroupSpi, UserSpi } from '@monorepo/domain'
import { startExpressServer } from './configuration/expressConf'
import { LoggerImpl } from './tools/Logger'
import { UserSpiImpl } from './spi/UserSpiImpl'
import { UserInfraService } from './service/UserInfraService'
import { GroupInfraService } from './service/GroupInfraService'
import { GroupSpiImpl } from './spi/GroupSpiImpl'
import { UserGroupSpiImpl } from './spi/UserGroupSpiImpl'
import { AppDataSource } from './configuration/typeOrmConf'
import { UserController } from './controller/UserController'
import { GroupController } from './controller/GroupController'

export const APPLICATION_PORT = 8080

const setupApplication = async () => {
  //Init Logger
  const appLogger: AppLogger = new LoggerImpl()

  //Init sequelize
  await AppDataSource.initialize()

  //Init SPI
  const userSpi: UserSpi = new UserSpiImpl(AppDataSource)
  const groupSpi: GroupSpi = new GroupSpiImpl(AppDataSource)
  const userGroupSpi: UserGroupSpi = new UserGroupSpiImpl(AppDataSource)

  //Init Services
  const userInfraService: UserInfraService = new UserInfraService(appLogger, userSpi)
  const groupInfraService: GroupInfraService = new GroupInfraService(appLogger, groupSpi, userSpi, userGroupSpi)

  //Init Controller
  UserController(appLogger, userInfraService)
  GroupController(appLogger, groupInfraService)

  //Start express server
  await startExpressServer(APPLICATION_PORT, appLogger)

  return { appLogger }
}

setupApplication().then(({ appLogger }) => {
  appLogger.info('Application started')
})
