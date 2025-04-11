import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | { email: string; sub: string; role: string; company?: string };
    }
  }
}