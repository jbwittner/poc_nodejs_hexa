import { AppLogger, GroupApi } from '@monorepo/domain'
import { NextFunction, Request, Response } from 'express'
import { app } from '../configuration/expressConf'
import { GroupTransformer } from '../transformer/GroupTransformer'

export interface GroupRequest {
  groupname: string
}

export interface GroupDTO {
  groupId: string
  groupName: string
}

export const GroupController = (appLogger: AppLogger, groupApi: GroupApi) => {
  app.post('/group', (req: Request, res: Response, next: NextFunction) => {
    appLogger.info('POST : /group')
    const { groupname } = req.body as GroupRequest

    if (typeof groupname !== 'string') {
      res.status(400).send('Groupname must be a string')
    } else {
      groupApi
        .createGroup(groupname)
        .then(group => {
          const groupDTO = GroupTransformer().toGroupDTO(group)
          res.status(201).send(groupDTO)
        })
        .catch(error => {
          next(error)
        })
    }
  })

  app.get('/group/:groupId', (req: Request, res: Response, next: NextFunction) => {
    appLogger.info('GET : /group/' + req.params.groupId)
    const groupId = req.params.groupId
    groupApi
      .getGroup(groupId)
      .then(group => {
        const groupDTO = GroupTransformer().toGroupDTO(group)
        res.status(200).send(groupDTO)
      })
      .catch(error => {
        next(error)
      })
  })
}
