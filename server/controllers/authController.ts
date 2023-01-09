import { Request, Response } from 'express';
import { sendResponse, sendNotFound, sendError } from '../utils/apiResponse';
import User from '../models/userModel';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);

    sendResponse(res, 201, newUser);
  } catch (error) {
    sendError(res, 500, error);
  }
};

export default { signup };
