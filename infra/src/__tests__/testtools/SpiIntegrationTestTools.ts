import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql'
import { UserApi, UserDomainService, UserSpi } from '@monorepo/domain'
import { UserSpiImpl } from '../../spi/UserSpiImpl'
import { DataSource, Repository } from 'typeorm'
import { AppDataSourceOptions } from '../../configuration/typeOrmConf'
import { UserEntity } from '../../spi/models/UserEntity'
import { GroupEntity } from '../../spi/models/GroupEntity'
import { UserGroupEntity } from '../../spi/models/UserGroupEntity'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export interface SpiApplicationTestContext {
  readonly userSpi: UserSpi
  readonly userApi: UserApi
  readonly startedContainer: StartedMySqlContainer
  readonly testAppDataSource: DataSource
  readonly repositories: Repositories
}

export interface Repositories {
  userRepository: Repository<UserEntity>
  groupRepository: Repository<GroupEntity>
  userGroupRepository: Repository<UserGroupEntity>
}

export const SpiInitInjectionAndStartServer = async (): Promise<SpiApplicationTestContext> => {
  const mySqlContainer = new MySqlContainer()
  const startedContainer = await mySqlContainer.start()

  const TestDataSourceOptions: MysqlConnectionOptions = {
    ...AppDataSourceOptions,
    host: startedContainer.getHost(),
    port: startedContainer.getPort(),
    username: startedContainer.getUsername(),
    password: startedContainer.getUserPassword(),
    database: startedContainer.getDatabase()
  }

  const testAppDataSource = new DataSource(TestDataSourceOptions)

  await testAppDataSource.initialize()

  const userSpi: UserSpi = new UserSpiImpl(testAppDataSource)
  const userApi: UserApi = new UserDomainService(userSpi)
  const userRepository = testAppDataSource.getRepository(UserEntity)
  const groupRepository = testAppDataSource.getRepository(GroupEntity)
  const userGroupRepository = testAppDataSource.getRepository(UserGroupEntity)

  const repositories: Repositories = {
    userRepository,
    groupRepository,
    userGroupRepository
  }

  return {
    userSpi,
    userApi,
    startedContainer,
    testAppDataSource,
    repositories
  }
}
