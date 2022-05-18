import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './custom-error';

export class UnauthentificatedError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
