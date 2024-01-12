import { Group } from '@monorepo/domain'
import { GroupDTO } from '../controller/GroupController'
import { GroupEntity } from '../spi/models/GroupEntity'

export const GroupTransformer = () => {
  const toGroupDTO = (group: Group): GroupDTO => {
    return {
      groupId: group.groupId,
      groupName: group.groupname
    }
  }

  const toGroupEntity = (group: Group): GroupEntity => {
    return new GroupEntity(group.groupId, group.groupname)
  }

  const fromGroupEntity = (groupEntity: GroupEntity): Group => {
    return new Group(groupEntity.groupId, groupEntity.groupName)
  }

  return {
    toGroupDTO,
    toGroupEntity,
    fromGroupEntity
  }
}
