import Boxer from '../models/boxerModel';
import { NextFunction, Request, Response } from 'express';
import { sendResponse, sendError, sendNotFound } from '../utils/apiResponse';
import catchErrorsAsync from '../utils/catchErrorsAsync';
import AppError from '../utils/appError';
import multer from 'multer';
import fs from 'fs';
import util from 'util';

import { uploadFile, getFileStream } from '../hooks/useStorage';

//* Creates an unlink function to remove the image file from the uploads folder
const unlinkFile = util.promisify(fs.unlink);

//* Multer upload config
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      // @ts-ignore
      cb(new AppError('Only images are allowed', 406), false);
    }
  },
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

    //* Removes the image file from the upload folder
    await unlinkFile(file.path);

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

    Promise.all([result, boxer])
      .then(() => {
        sendResponse(res, 201, boxer);
      })
      .catch(() => {
        return next(new AppError('Error adding boxer', 500));
      });

    // sendResponse(res, 201, boxer);
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

export const getBoxerImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let key = req.params.key;
    console.log(req.params);
    const file = await getFileStream(key);

    if (!file) {
      sendNotFound(res, 404, 'File not found');
      return;
    }

    // const response = {
    //   statusCode: 200,
    //   headers: { 'Content-Type': ['image/png', 'image/jpg', 'image/jpeg'] },
    //   body: file,
    // };

    console.log(res);

    file.pipe(res);
    // res.send(response);
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
  getBoxerImage,
};
