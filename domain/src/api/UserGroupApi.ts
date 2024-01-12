import { UserGroup } from '../model/UserGroup'

export interface UserGroupApi {
  createUserGroup: (groupId: string, userId: string) => Promise<UserGroup>
}
