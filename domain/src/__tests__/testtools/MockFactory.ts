import { User } from '../../model'
import { UserSpi } from '../../spi'

export const MockUserSpiFactory = () => {
  const mockUserSpi: jest.Mocked<UserSpi> = {
    save: jest.fn(),
    findUser: jest.fn()
  }

  const mockClear = () => {
    mockUserSpi.save.mockClear()
    mockUserSpi.findUser.mockClear()
  }

  const mockSave = () => {
    mockUserSpi.save.mockImplementation(user => Promise.resolve(user))
  }

  const mockFindUser = (userId: string, userToFind: User | null) => {
    mockUserSpi.findUser.mockImplementation(input => {
      if (input !== userId) {
        return Promise.resolve(null)
      } else {
        return Promise.resolve(userToFind)
      }
    })
  }

  const getMock = () => {
    return mockUserSpi
  }

  return {
    getMock,
    mockClear,
    mockSave,
    mockFindUser,
    mockUserSpi
  }
}
