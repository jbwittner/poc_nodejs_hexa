import { SpiApplicationTestContext, SpiInitInjectionAndStartServer } from '../../testtools/SpiIntegrationTestTools'
import { FindUserTestOk, UserNotExistTest } from './userspiimpl/FindUser.test'
import { SaveUserTest } from './userspiimpl/SaveUser.Test'

describe('Integration SPI test wrapper', () => {
  jest.setTimeout(60000)

  let testContext: SpiApplicationTestContext

  beforeAll(async () => {
    testContext = await SpiInitInjectionAndStartServer()
  })

  afterAll(async () => {
    await testContext.testAppDataSource.destroy()
    await testContext.startedContainer.stop()
  })

  describe('UserSpiImpl', () => {
    describe('Save user', () => {
      test('ok', async () => SaveUserTest(testContext))
    })

    describe('Find user', () => {
      test('Ok', async () => FindUserTestOk(testContext))
      test('User not exist', async () => UserNotExistTest(testContext))
    })
  })
})
