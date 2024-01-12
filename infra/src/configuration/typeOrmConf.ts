import { DataSource } from 'typeorm'
import { UserEntity } from '../spi/models/UserEntity'
import { GroupEntity } from '../spi/models/GroupEntity'
import { UserGroupEntity } from '../spi/models/UserGroupEntity'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export interface AppDataSourceInterface {
  readonly host: string
  readonly port: number
  readonly username: string
  readonly password: string
  readonly database: string
}

export const AppDataSourceOptions: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'hexanpmmysql_user',
  password: 'HexaNpmMysqlPass2023',
  database: 'hexanpmmysql_db',
  synchronize: true,
  logging: true,
  logger: 'simple-console',
  entities: [UserEntity, GroupEntity, UserGroupEntity],
  migrations: [],
  subscribers: []
}

export const AppDataSource = new DataSource(AppDataSourceOptions)
