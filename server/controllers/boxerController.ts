import Boxer from '../models/boxerModel';
import { NextFunction, Request, Response } from 'express';
import { sendResponse, sendError, sendNotFound } from '../utils/apiResponse';
import catchErrorsAsync from '../utils/catchErrorsAsync';
import AppError from '../utils/appError';
import multer from 'multer';

import { uploadFile, getFileStream } from '../hooks/useStorage';

//* Multer upload config
const upload = multer({
  dest: 'uploads/',
});

export const uploadBoxerProfilePicture = upload.single('picture');

//* @ Get all boxers
//* @ route GET /api/boxers
//* @ access Private
export const getAllBoxers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const boxers = await Boxer.find();

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
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      firstName,
      lastName,
      nickName,
      dob,
      email,
      weight,
      height,
      stance,
      fights,
      licenseNumber,
      fitToFight,
      club,
    } = req.body;

    console.log('Body', req.body);
    console.log('Photo', req.file);

    const file = req.file as Express.Multer.File;
    const result = await uploadFile(file);

    const boxer = await Boxer.create({
      firstName,
      lastName,
      nickName,
      dob,
      email,
      weight,
      height,
      stance,
      fights,
      licenseNumber,
      fitToFight,
      club,
      picture: result.Key,
    });

    // if()

    if (!result) {
      return next(new AppError('Problem uploading picture', 400));
    }
    console.log(result);

    sendResponse(res, 201, boxer);
  }
);

//* @ Update a boxer
//* @ route PATCH /api/boxers/:id
//* @ access Private
export const updateBoxer = catchErrorsAsync(
  async (req: Request, res: Response): Promise<void> => {
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
  }
);

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

export default {
  getAllBoxers,
  getBoxer,
  addBoxer,
  updateBoxer,
  deleteBoxer,
  uploadBoxerProfilePicture,
};
