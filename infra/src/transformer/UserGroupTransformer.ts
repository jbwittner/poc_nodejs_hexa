import { UserGroup } from '@monorepo/domain'
import { UserGroupEntity } from '../spi/models/UserGroupEntity'
import { UserTransformer } from './UserTransformer'
import { GroupTransformer } from './GroupTransformer'

export const UserGroupTransformer = () => {
  const toUserGroupEntity = (userGroup: UserGroup): UserGroupEntity => {
    const userEntity = UserTransformer().toUserEntity(userGroup.user)
    const groupEntity = GroupTransformer().toGroupEntity(userGroup.group)
    return new UserGroupEntity(userGroup.userGroupId, userEntity, groupEntity)
  }

  const fromUserGroupEntity = (userGroupEntity: UserGroupEntity): UserGroup => {
    const user = UserTransformer().fromUserEntity(userGroupEntity.userEntity)
    const group = GroupTransformer().fromGroupEntity(userGroupEntity.groupEntity)
    return new UserGroup(userGroupEntity.userGroupId, user, group)
  }

  return {
    toUserGroupEntity,
    fromUserGroupEntity
  }
}
