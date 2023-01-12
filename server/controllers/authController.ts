import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import catchErrorsAsync from '../utils/catchErrorsAsync';
import AppError from '../utils/appError';
import sendEmail from '../utils/email';
import User from '../models/userModel';

import promisify from 'promisify-node';

interface decoded extends JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

//info Create a token
const getAuthToken = (id: string): string => {
  return jwt.sign({ id }, String(config.jwt.secret), {
    expiresIn: config.jwt.expiresIn,
  });
};

export const signup = catchErrorsAsync(
  async (req: Request, res: Response): Promise<void> => {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      contactNumber: req.body.contactNumber,
      club: req.body.club,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    const token = getAuthToken(newUser.id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });

    //info Send confirmation email on sign up
    const url = `${req.protocol}://${req.get('host')}/me`;
    await sendEmail({
      email: newUser.email,
      subject: 'Welcome to Boxer-Connect',
      message: `Please click the link below to confirm your email address: ${url}`,
    });
  }
);

export const login = catchErrorsAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    const user = await User.findOne({ email }).select('+password');

    // 2) Check if user exists && password is correct
    if (!user || !(await user?.correctPassword(password, user.password))) {
      return next(
        new AppError('Incorrect login details, Please try again', 401)
      );
    }

    // 3) If everything ok, send token to client
    const token = getAuthToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
    });
  }
);

export const protect = catchErrorsAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1) Getting token and check of it's there
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization?.startsWith('Bearer')
    ) {
    }
    token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verification token
    const decoded = (await promisify(jwt.verify)(
      token,
      String(config.jwt.secret)
    )) as JwtPayload;
    console.log(decoded);

    // 3) Check if user still exists
    const isCurrentUser = await User.findById(decoded.id);
    if (!isCurrentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (isCurrentUser.changedPasswordAfter(decoded.iat as number)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }
    // req.user = isCurrentUser;
    next();
  }
);

export default { signup, login, protect };
