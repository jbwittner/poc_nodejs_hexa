import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('GROUPS')
export class GroupEntity {
  @PrimaryColumn({ name: 'GROUP_ID' })
  groupId: string

  @Column({ name: 'GROUP_NAME' })
  groupName: string

  constructor(groupId: string, groupName: string) {
    this.groupId = groupId
    this.groupName = groupName
  }
}
