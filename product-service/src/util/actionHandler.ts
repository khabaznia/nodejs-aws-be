import { formatJSONResponse } from '@libs/apiGateway'
import { ErrorCode, ErrorMessage } from '../error/const'
import { ApplicationError, DatabaseError, ValidationError } from '../error/errors'

export const executeAction = async action => {
  try {
    console.log('Try to process request')
    const response = await action()
    console.log(`Response to convert -> ${response}`)
    return formatJSONResponse(response)
  } catch (err) {
    console.log(`An error occurred during processing response -> ${err.message}`)
    if (err instanceof ValidationError) {
      return formatJSONResponse(ErrorMessage.BAD_REQUEST, ErrorCode.BAD_REQUEST)
    }
    if (err instanceof DatabaseError) {
      return formatJSONResponse(ErrorMessage.SERVER_ERROR, ErrorCode.SERVER_ERROR)
    }
    if (err instanceof ApplicationError) {
      return formatJSONResponse(err.message, err.errorCode)
    }
  }
}