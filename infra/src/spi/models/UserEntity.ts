import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('USERS')
export class UserEntity {
  @PrimaryColumn({ name: 'USER_ID' })
  userId: string

  @Column({ name: 'USER_NAME' })
  userName: string

  constructor(userId: string, userName: string) {
    this.userId = userId
    this.userName = userName
  }
}
