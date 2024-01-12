/* eslint-disable  @typescript-eslint/no-explicit-any */
export type LogInfo = (data: any) => void
export type LogWarn = (data: any) => void
export type LogError = (data: any) => void

export interface AppLogger {
  info: LogInfo
  warn: LogWarn
  error: LogError
}
