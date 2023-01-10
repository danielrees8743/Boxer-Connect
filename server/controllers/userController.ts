import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import { sendResponse, sendError, sendNotFound } from '../utils/apiResponse';
import catchErrorsAsync from '../utils/catchErrorsAsync';

//* @ Get all users
//* @ route GET /api/users
//* @ access Private
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().populate('club').select('-__v');
    sendResponse(res, 200, users);
  } catch (error) {
    res.status(500).json({ status: 'fail', error });
  }
};

//* @Get a single user
//* @route GET /api/users/:id
//* @access Private
export const getUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  try {
    const user = await User.findById(req.params.id)
      .populate('club')
      .select('-__v');
    if (!user) {
      sendNotFound(res, 404, 'User not found');
      return;
    }

    sendResponse(res, 200, user);
  } catch (error) {
    sendError(res, 500, error);
  }
};

//* @Add a user
//* @route POST /api/users
//* @access Private
export const addUser = catchErrorsAsync(async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: user,
  });
});

//* @Update a user
//* @route PATCH /api/users/:id
//* @access Private
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      sendNotFound(res, 404, 'User not found');
      return;
    }

    sendResponse(res, 200, user);
  } catch (error) {
    sendError(res, 500, error);
  }
};

//* @Delete a user
//* @route DELETE /api/users/:id
//* @access Private
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      sendNotFound(res, 404, 'User not found');
      return;
    }
    sendResponse(res, 200, user);
  } catch (error) {
    sendError(res, 500, error);
  }
};

export default {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
