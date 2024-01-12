import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { UserEntity } from './UserEntity'
import { GroupEntity } from './GroupEntity'

@Entity('USER_GROUPS')
export class UserGroupEntity {
  @PrimaryColumn({ name: 'USER_GROUP_ID' })
  userGroupId: string

  @ManyToOne(() => UserEntity) // note: we will create author property in the Photo class below
  @JoinColumn({ name: 'USER_ENTITY_ID' })
  userEntity: UserEntity

  @ManyToOne(() => GroupEntity)
  @JoinColumn({ name: 'GROUP_ENTITY_ID' })
  groupEntity: GroupEntity

  constructor(userGroupId: string, userEntity: UserEntity, groupEntity: GroupEntity) {
    this.userGroupId = userGroupId
    this.userEntity = userEntity
    this.groupEntity = groupEntity
  }
}
