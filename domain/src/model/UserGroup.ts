import { Group } from './Group'
import { User } from './User'

export class UserGroup {
  readonly userGroupId: string
  readonly user: User
  readonly group: Group

  constructor(userGroupId: string, user: User, group: Group) {
    this.userGroupId = userGroupId
    this.user = user
    this.group = group
  }
}
