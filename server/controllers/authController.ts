import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import catchErrorsAsync from '../utils/catchErrorsAsync';
import AppError from '../utils/appError';
import sendEmail from '../utils/email';
import User from '../models/userModel';
import promisify from 'promisify-node';
import { ICoach, ICookie } from '../types/Interfaces';
import Club from '../models/clubModel';
import crypto from 'crypto';

interface AuthRequest extends Request {
  user?: ICoach;
}

//info Create a token to be sent to the user
const getAuthToken = (id: string): string => {
  return jwt.sign({ id }, String(config.jwt.secret), {
    expiresIn: config.jwt.expiresIn,
  });
};

// //info Set cookie options
const cookieOptions: ICookie = {
  expires: new Date(
    Number(<number>Date.now()) +
      <any>config.jwt.cookieExpiresIn * 24 * 60 * 60 * 1000
  ),
  httpOnly: process.env.NODE_ENV === 'production',
  secure: false,
};
if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//info Create and send token
const createSendToken = (
  user: { id: string; password?: string },
  statusCode: number,
  res: Response
): void => {
  const token = getAuthToken(user.id);

  //! Figure out why this is not working and how to fix it!
  //! This should show in the cookies tab in the application tab in the browser
  //info Set cookie
  res.cookie('jwt', token, cookieOptions);

  //info Remove password from output
  user.password = undefined;
  res.status(statusCode).json({ status: 'success', user, token });
};

//info Signup user
export const signup = catchErrorsAsync(
  async (req: Request, res: Response): Promise<void> => {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      contactNumber,
      club,
      passwordChangedAt,
      active,
    } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      contactNumber,
      club,
      passwordChangedAt,
      active,
    });

    createSendToken(newUser, 201, res);

    //info Send confirmation email on sign up
    // const url = `${req.protocol}://${req.get('host')}/me`;
    // await sendEmail({
    //   email: newUser.email,
    //   subject: 'Welcome to Boxer-Connect',
    //   message: `Please click the link below to confirm your email address: ${url}`,
    // });
  }
);

//info Login user
export const login = catchErrorsAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, club } = req.body;
    console.log('Input club', club);

    const clubRef = await Club.findOne({ _id: club });

    //- Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    // console.log('Email: ', email, 'Password: ', password);
    // console.log('User', user);
    // console.log('ClubId: ', club);
    // console.log('ClubRef: ', clubRef);

    //- Check if user exists && password is correct
    if (
      !user ||
      !(await user.correctPassword(password, user.password))
      // ||
      // user.club !== clubRef?._id
    ) {
      return next(
        new AppError('Incorrect login details, Please try again', 401)
      );
    }

    //- If everything ok, send token to client
    createSendToken(user, 200, res);
  }
);

//info Logout user
export const logout = (req: Request, res: Response): void => {
  //- Clear the cookie by setting it to an expired date to a very short time
  res.cookie('jwt', 'loggedoutToken', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

//info Protect routes from unauthorized access
export const protect = catchErrorsAsync(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    //- Getting token and check of it's there
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization?.startsWith('Bearer')
    ) {
      token = req.headers.authorization?.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    //- Verification token
    const decoded = (await promisify(jwt.verify)(
      token,
      String(config.jwt.secret)
    )) as JwtPayload;

    //- Check if user still exists
    const isCurrentUser = await User.findById(decoded.id);
    if (!isCurrentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    //- Check if user changed password after the token was issued
    if (isCurrentUser.changedPasswordAfter(decoded.iat as number)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }
    req.user = isCurrentUser;
    // console.log(req.user);
    next();
  }
);

//info Restrict routes to specific roles only
export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role && !roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You are not authorized to do this, Please see the Head-Coach',
          403
        )
      );
    }
    next();
  };
};

//info Forgot password route, send reset token to user email
export const forgotPassword = catchErrorsAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;

    //- Get user based on POSTed email
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }

    //- Generate a random reset token
    const resetToken = user.createRandomPasswordToken();
    await user.save({ validateBeforeSave: false });

    //- Send the random reset token to the user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}api/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and confirm password to: ${resetURL}\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          'There was an error sending the email. Try again later!',
          500
        )
      );
    }
  }
);

//info Reset password
export const resetPassword = catchErrorsAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //- Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new AppError(
          'Reset token has expired or is invalid, please try again',
          400
        )
      );
    }

    //- Set the new password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //- Update changedPasswordAt property for the user
    //- this is done via a pre save middleware in the user model

    //- Log the user in, send JWT
    createSendToken(user, 200, res);
  }
);

export const updatePassword = catchErrorsAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id).select('+password');

    if (!user) {
      return next(new AppError('User not Found', 404));
    }

    if (
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError('Your current password is incorrect', 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    //- Log user in, send JWT
    createSendToken(user, 200, res);
  }
);

export default {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
};
function next(arg0: AppError): void | PromiseLike<void> {
  throw new Error('Function not implemented.');
}
