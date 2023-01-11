import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import { sendResponse, sendError, sendNotFound } from '../utils/apiResponse';
import catchErrorsAsync from '../utils/catchErrorsAsync';
import { IUser } from '../types/Interfaces';

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
export const createUser = async (
  req: Request,
  res: Response
): Promise<void | undefined> => {
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
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
