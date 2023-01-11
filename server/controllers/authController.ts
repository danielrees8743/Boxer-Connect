import { Request, Response, NextFunction } from 'express';
import catchErrorsAsync from '../utils/catchErrorsAsync';
import AppError from '../utils/appError';
import User from '../models/userModel';

export const signup = catchErrorsAsync(
  async (req: Request, res: Response): Promise<void> => {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  }
);

export default { signup };
