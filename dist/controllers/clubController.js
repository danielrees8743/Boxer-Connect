"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClub = exports.updateClub = exports.addClub = exports.getClub = exports.getAllClubs = void 0;
const clubModel_1 = __importDefault(require("../models/clubModel"));
//* @ Get all clubs
//* @ route GET /api/clubs
//* @ access Public
const getAllClubs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubs = yield clubModel_1.default.find().populate('').select('-__v');
        res.status(200).json({ status: 'success', clubs });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllClubs = getAllClubs;
//* @Get a single club
//* @route GET /api/clubs/:id
//* @access Public
const getClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    try {
        const club = yield clubModel_1.default.findById(req.params.id).populate('').select('-__v');
        if (!club)
            res.status(404).json({ status: 'fail', message: 'Club not found' });
        res.status(200).json({ status: 'success', club });
    }
    catch (error) {
        res.status(500).json({ status: 'fail', error });
    }
});
exports.getClub = getClub;
//* @Add a club
//* @route POST /api/clubs
//* @access Private
// todo: add Authentication - only admins can add clubs
// todo: club ID first letter should be capital pre-save
const addClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const club = yield clubModel_1.default.create(req.body);
        res.status(201).json({ status: 'success', club });
    }
    catch (error) {
        res.status(500).json({ status: 'fail', error });
    }
});
exports.addClub = addClub;
//* @Update a club
//* @route PATCH /api/clubs/:id
//* @access Private
const updateClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const club = yield clubModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!club)
            res.status(404).json({ status: 'fail', message: 'Club not found' });
        res.status(200).json({ status: 'success', club });
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error,
        });
    }
});
exports.updateClub = updateClub;
//* @Delete a club
//* @route DELETE /api/clubs/:id
//* @access Private
const deleteClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const club = yield clubModel_1.default.findByIdAndDelete(req.params.id);
        if (!club)
            res.status(404).json({ status: 'fail', message: 'Club not found' });
        res.status(204).json({ status: 'success', club });
    }
    catch (error) {
        res.status(500).json({ status: 'fail', error });
    }
});
exports.deleteClub = deleteClub;
exports.default = { getAllClubs: exports.getAllClubs, getClub: exports.getClub, addClub: exports.addClub, updateClub: exports.updateClub, deleteClub: exports.deleteClub };
