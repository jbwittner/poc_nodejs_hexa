import { v4 as uuidv4 } from 'uuid'
import { Group } from '../model'
import { GroupApi } from '../api/GroupApi'
import { GroupSpi } from '../spi/GroupSpi'
import { UserSpi } from '../spi'
import { UserGroup } from '../model/UserGroup'
import { UserGroupSpi } from '../spi/UserGroupSpi'

export class GroupDomainService implements GroupApi {
  private groupSpi: GroupSpi
  private userGroupSpi: UserGroupSpi
  private userSpi: UserSpi

  constructor(groupSpi: GroupSpi, userSpi: UserSpi, userGroupSpi: UserGroupSpi) {
    this.groupSpi = groupSpi
    this.userGroupSpi = userGroupSpi
    this.userSpi = userSpi
  }

  async addUserToGroup(groupId: string, userId: string) {
    const userPromise = this.userSpi.findByUserId(userId)
    const groupPromise = this.groupSpi.findByGroupId(groupId)

    const [user, group] = await Promise.all([userPromise, groupPromise])

    if (user === null) {
      throw new Error('User not exist')
    } else if (group === null) {
      throw new Error('Group not exist')
    }

    const userGroupId = uuidv4()
    const userGroup = new UserGroup(userGroupId, user, group)

    return this.userGroupSpi.save(userGroup)
  }

  async getGroup(groupId: string) {
    const finded = await this.groupSpi.findByGroupId(groupId)
    if (finded === null) {
      throw new Error('Group not exist')
    }
    return finded
  }

  async createGroup(groupname: string) {
    const groupId = uuidv4()
    const user = new Group(groupname, groupId)
    return await this.groupSpi.save(user)
  }
}
