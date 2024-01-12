export class Group {
  readonly groupname: string
  readonly groupId: string

  constructor(groupname: string, groupId: string) {
    this.groupname = groupname
    this.groupId = groupId
  }
}
