import Boxer from '../models/boxerModel';
import { Request, Response } from 'express';
import { sendResponse, sendError, sendNotFound } from '../utils/apiResponse';
import catchErrorsAsync from '../utils/catchErrorsAsync';

//* @ Get all boxers
//* @ route GET /api/boxers
//* @ access Private
export const getAllBoxers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const boxers = await Boxer.find().populate('').select('-__v');
    sendResponse(res, 200, boxers);
  } catch (error) {
    sendError(res, 500, error);
  }
};

//* @ Get a single boxer
//* @ route GET /api/boxers?:id
//* @ access Private
export const getBoxer = async (req: Request, res: Response): Promise<void> => {
  try {
    const boxer = await Boxer.findById(req.params.id)
      .populate('')
      .select('-__v');

    if (!boxer) {
      sendNotFound(res, 404, 'Boxer not found');
      return;
    }
    sendResponse(res, 200, boxer);
  } catch (error) {
    sendError(res, 500, error);
  }
};
//* @ Add a boxer
//* @ route POST /api/boxers
//* @ access Private
export const addBoxer = catchErrorsAsync(
  async (req: Request, res: Response): Promise<void> => {
    const boxer = await Boxer.create(req.body);
    sendResponse(res, 201, boxer);
  }
);

//* @ Update a boxer
//* @ route PATCH /api/boxers/:id
//* @ access Private
export const updateBoxer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const boxer = await Boxer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!boxer) {
      sendNotFound(res, 404, 'Boxer not found');
      return;
    }
    sendResponse(res, 200, boxer);
  } catch (error) {
    sendError(res, 500, error);
  }
};

//* @ Delete a boxer
//* @ route DELETE /api/boxers/:id
//* @ access Private
export const deleteBoxer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const boxer = await Boxer.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', boxer });
  } catch (error) {
    sendError(res, 500, error);
  }
};

export default { getAllBoxers, getBoxer, addBoxer, updateBoxer, deleteBoxer };
