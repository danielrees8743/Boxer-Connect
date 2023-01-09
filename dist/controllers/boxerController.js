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
exports.deleteBoxer = exports.updateBoxer = exports.addBoxer = exports.getBoxer = exports.getAllBoxers = void 0;
const boxerModel_1 = __importDefault(require("../models/boxerModel"));
//* @ Get all boxers
//* @ route GET /api/boxers
//* @ access Private
const getAllBoxers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boxers = yield boxerModel_1.default.find().populate('').select('-__v');
        res.status(200).json({ status: 'success', boxers });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllBoxers = getAllBoxers;
//* @ Get a single boxer
//* @ route GET /api/boxers?:id
//* @ access Private
const getBoxer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boxer = yield boxerModel_1.default.findById(req.params.id)
            .populate('')
            .select('-__v');
        if (!boxer) {
            res.status(404).json({ status: 'fail', message: 'Boxer not found' });
        }
        res.status(200).json({ status: 'success', boxer });
    }
    catch (error) {
        res.status(500).json({ status: 'fail', error });
    }
});
exports.getBoxer = getBoxer;
//* @ Add a boxer
//* @ route POST /api/boxers
//* @ access Private
const addBoxer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boxer = yield boxerModel_1.default.create(req.body);
        res.status(201).json({ status: 'success', boxer });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.addBoxer = addBoxer;
//* @ Update a boxer
//* @ route PATCH /api/boxers/:id
//* @ access Private
const updateBoxer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boxer = yield boxerModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!boxer)
            res.status(404).json({ status: 'fail', message: 'Boxer not found' });
        res.status(200).json({ status: 'success', boxer });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.updateBoxer = updateBoxer;
//* @ Delete a boxer
//* @ route DELETE /api/boxers/:id
//* @ access Private
const deleteBoxer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boxer = yield boxerModel_1.default.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', boxer });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteBoxer = deleteBoxer;
exports.default = { getAllBoxers: exports.getAllBoxers, getBoxer: exports.getBoxer, addBoxer: exports.addBoxer, updateBoxer: exports.updateBoxer, deleteBoxer: exports.deleteBoxer };
