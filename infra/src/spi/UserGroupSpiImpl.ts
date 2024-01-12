import { UserGroup, UserGroupSpi } from '@monorepo/domain'
import { DataSource, Repository } from 'typeorm'
import { UserGroupEntity } from './models/UserGroupEntity'
import { UserGroupTransformer } from '../transformer/UserGroupTransformer'

export class UserGroupSpiImpl implements UserGroupSpi {
  private readonly userGroupRepository: Repository<UserGroupEntity>

  constructor(dataSource: DataSource) {
    this.userGroupRepository = dataSource.getRepository(UserGroupEntity)
  }

  async findByUserGroupId(userGroupId: string) {
    const result = await this.userGroupRepository.findOneBy({
      userGroupId: userGroupId
    })
    if (result) {
      return UserGroupTransformer().fromUserGroupEntity(result)
    } else {
      return null
    }
  }

  async save(userGroup: UserGroup) {
    const userGroupEntity = UserGroupTransformer().toUserGroupEntity(userGroup)
    const userGroupEntitySaved = await this.userGroupRepository.save(userGroupEntity)
    return UserGroupTransformer().fromUserGroupEntity(userGroupEntitySaved)
  }
}
