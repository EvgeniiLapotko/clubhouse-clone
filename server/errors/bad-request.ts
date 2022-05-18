import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './custom-error';

export class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
