import { ErrorCode } from './const'

export class DatabaseError extends Error {
}

export class ValidationError extends Error {
}

export class ApplicationError extends Error {
  errorCode: ErrorCode

  constructor (msg: string, errorCode: ErrorCode) {
    super(msg)
    this.errorCode = errorCode
  }
}