import { Group, GroupSpi } from '@monorepo/domain'
import { DataSource, Repository } from 'typeorm'
import { GroupEntity } from './models/GroupEntity'
import { GroupTransformer } from '../transformer/GroupTransformer'

export class GroupSpiImpl implements GroupSpi {
  private readonly groupRepository: Repository<GroupEntity>

  constructor(dataSource: DataSource) {
    this.groupRepository = dataSource.getRepository(GroupEntity)
  }

  async findByGroupId(groupId: string) {
    const result = await this.groupRepository.findOneBy({
      groupId: groupId
    })
    if (result) {
      return GroupTransformer().fromGroupEntity(result)
    } else {
      return null
    }
  }

  async save(group: Group) {
    const groupEntity = GroupTransformer().toGroupEntity(group)
    const groupEntitySaved = await this.groupRepository.save(groupEntity)
    return GroupTransformer().fromGroupEntity(groupEntitySaved)
  }
}
