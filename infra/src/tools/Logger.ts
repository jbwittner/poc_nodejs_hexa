import { AppLogger } from '@monorepo/domain/src'

export class LoggerImpl implements AppLogger {
  info = (data: string) => {
    console.log('info : ' + data)
  }
  warn = (data: string) => {
    console.log('warn : ' + data)
  }
  error = (data: string) => {
    console.log('error : ' + data)
  }
}
