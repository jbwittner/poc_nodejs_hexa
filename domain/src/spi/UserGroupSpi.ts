import { UserGroup } from '../model'

export interface UserGroupSpi {
  save: (userGroup: UserGroup) => Promise<UserGroup>
  findByUserGroupId: (userGroupId: string) => Promise<UserGroup | null>
}
