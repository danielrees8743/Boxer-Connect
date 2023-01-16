import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import catchErrorsAsync from '../utils/catchErrorsAsync';
import AppError from '../utils/appError';
import { ICoach } from '../types/Interfaces';

interface AuthRequest extends Request {
  user?: ICoach;
}

//- filter out unwanted fields names that are not allowed to be updated
const filterObj = (obj: Request<Object>, ...allowedFields: string[]) => {
  const newObj: any = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//* @ Get all users
//* @ route GET /api/users
//* @ access Private
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('club').select('-__v');
    return res
      .status(200)
      .json({ status: 'success', results: users.length, data: { users } });
  } catch (error) {
    res.status(500).json({ status: 'fail', error });
  }
};

//* @Update a user
//* @route PATCH /api/users/updateMe
//* @access Private
export const updateMe = catchErrorsAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    //- Create error if user POSTs password data (not allowed)
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for changing or updating password. Please use /api/users/updateMyPassword',
          400
        )
      );
    }

    //- Filter out fields that are only allowed to be updated
    const filteredBody: Request<Object> = filterObj(
      req.body,
      'firstName',
      'lastName',
      'email',
      'contactNumber'
    );
    const updated = await User.findByIdAndUpdate(req.user?.id, filteredBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: { updated } });
  }
);

//* @Delete a user
//* @route DELETE /api/users/deleteMe
//* @access Private
export const deleteMe = catchErrorsAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user?.id, { active: false });
    res.status(204).json({ status: 'success', data: null });
  }
);

//* @Get a single user
//* @route GET /api/users/:id
//* @access Private
export const getUser = async (req: Request, res: Response) => {
  res
    .status(500)
    .json({ status: 'fail', error: 'This route is not yet defined' });
};

//* @Add a user
//* @route POST /api/users
//* @access Private
export const createUser = async (req: Request, res: Response) => {
  res
    .status(500)
    .json({ status: 'fail', error: 'This route is not yet defined' });
};

//* @Update a user
//* @route PATCH /api/users/:id
//* @access Private
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  res
    .status(500)
    .json({ status: 'fail', error: 'This route is not yet defined' });
};

//* @Delete a user
//* @route DELETE /api/users/:id
//* @access Private
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  res
    .status(500)
    .json({ status: 'fail', error: 'This route is not yet defined' });
};

export default {
  getAllUsers,
  updateMe,
  deleteMe,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
