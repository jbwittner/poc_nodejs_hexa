import { Group } from '../model'

export interface GroupSpi {
  save: (group: Group) => Promise<Group>
  findByGroupId: (groupId: string) => Promise<Group | null>
}
