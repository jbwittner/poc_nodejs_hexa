import { AppLogger, UserApi } from '@monorepo/domain/src'
import { NextFunction, Request, Response } from 'express'
import { UserTransformer } from '../transformer/UserTransformer'
import { app } from '../configuration/expressConf'

export interface UserRequest {
  username: string
}

export interface UserDTO {
  userId: string
  userName: string
}

export const UserController = (appLogger: AppLogger, userApi: UserApi) => {
  app.post('/user', (req: Request, res: Response, next: NextFunction) => {
    appLogger.info('POST : /user')
    const { username } = req.body as UserRequest

    if (typeof username !== 'string') {
      res.status(400).send('Username must be a string')
    } else {
      userApi
        .createUser(username)
        .then(user => {
          const userDTO = UserTransformer().toUserDTO(user)
          res.status(201).send(userDTO)
        })
        .catch(error => {
          next(error)
        })
    }
  })

  app.get('/user/:userId', (req: Request, res: Response, next: NextFunction) => {
    appLogger.info('GET : /user/' + req.params.userId)
    const userId = req.params.userId
    userApi
      .getUser(userId)
      .then(user => {
        const userDTO = UserTransformer().toUserDTO(user)
        res.status(200).send(userDTO)
      })
      .catch(error => {
        next(error)
      })
  })
}
