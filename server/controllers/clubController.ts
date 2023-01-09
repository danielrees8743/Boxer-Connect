import Club from '../models/clubModel';
import { Request, Response } from 'express';
import { sendResponse, sendError, sendNotFound } from '../utils/apiResponse';

//* @ Get all clubs
//* @ route GET /api/clubs
//* @ access Public
export const getAllClubs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clubs = await Club.find().populate('').select('-__v');
    sendResponse(res, 200, clubs);
  } catch (error) {
    sendError(res, 500, error);
  }
};

//* @Get a single club
//* @route GET /api/clubs/:id
//* @access Public
export const getClub = async (req: Request, res: Response): Promise<void> => {
  console.log(req.params.id);
  try {
    const club = await Club.findById(req.params.id).populate('').select('-__v');
    if (!club) {
      sendNotFound(res, 404, 'Club not found');
      return;
    }

    sendResponse(res, 200, club);
  } catch (error) {
    sendError(res, 500, error);
  }
};

//* @Add a club
//* @route POST /api/clubs
//* @access Private
// todo: add Authentication - only admins can add clubs
// todo: club ID first letter should be capital pre-save
export const addClub = async (req: Request, res: Response): Promise<void> => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json({ status: 'success', club });
  } catch (error) {
    sendError(res, 500, error);
  }
};

//* @Update a club
//* @route PATCH /api/clubs/:id
//* @access Private
export const updateClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!club) {
      sendNotFound(res, 404, 'Club not found');
      return;
    }

    sendResponse(res, 200, club);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
};

//* @Delete a club
//* @route DELETE /api/clubs/:id
//* @access Private
export const deleteClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) {
      sendNotFound(res, 404, 'Club not found');
      return;
    }
    res.status(204).json({ status: 'success', club });
  } catch (error) {
    sendError(res, 500, error);
  }
};

export default { getAllClubs, getClub, addClub, updateClub, deleteClub };
