import { ICoach } from './Interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: ICoach;
    }
  }
}

export {};
