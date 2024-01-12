import { UserDomainService } from '../../../service'
import { MockUserSpiFactory } from '../../testtools/MockFactory'

describe('Test createUser method', () => {
  const mockUserSpiFactory = MockUserSpiFactory()
  const userDomainService = new UserDomainService(mockUserSpiFactory.getMock())

  beforeEach(() => {
    mockUserSpiFactory.mockClear()
  })

  test('Create user Ok', async () => {
    mockUserSpiFactory.mockSave()
    const userName = 'userToto'
    const user = await userDomainService.createUser(userName)
    expect(user.getUserName()).toBe(userName)
  })
})
