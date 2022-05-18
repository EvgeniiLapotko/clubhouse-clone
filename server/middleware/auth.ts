import jwt from 'jsonwebtoken';
import { UnauthentificatedError } from '../errors/unauthentificated';

export const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthentificatedError('Token not found');
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    req.user = decoded;
    next();
  } catch (e) {
    throw new UnauthentificatedError('Not authorized to access this route');
  }
};
