import { Group } from '../model'
import { UserGroup } from '../model/UserGroup'

export interface GroupApi {
  createGroup: (groupname: string) => Promise<Group>
  getGroup: (groupId: string) => Promise<Group>
  addUserToGroup: (groupId: string, userId: string) => Promise<UserGroup>
}
