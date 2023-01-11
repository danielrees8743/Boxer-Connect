import { Request, Response, NextFunction } from 'express';
import catchErrorsAsync from '../utils/catchErrorsAsync';
import AppError from '../utils/appError';
import User from '../models/userModel';

//info
import sendEmail from '../utils/email';

export const signup = catchErrorsAsync(
  async (req: Request, res: Response): Promise<void> => {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newUser,
      },
    });

    const url = `${req.protocol}://${req.get('host')}/me`;
    await sendEmail({
      email: newUser.email,
      subject: 'Welcome to Boxer-Connect',
      message: `Please click the link below to confirm your email address: ${url}`,
    });
  }
);

export default { signup };
