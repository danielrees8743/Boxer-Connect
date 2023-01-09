"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClubSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your club name'],
    },
    division: {
        type: String,
        required: [true, 'Please enter your division'],
        unique: true,
    },
    clubId: {
        type: String,
        required: [true, 'Please enter your club ID'],
        unique: true,
    },
    contactEmail: {
        type: String,
        required: [true, 'Please enter your contact email'],
        unique: true,
    },
    contactName: {
        type: String,
        required: [true, 'Please enter your contact name'],
    },
});
ClubSchema.pre('save', function (next) {
    this.clubId = this.clubId.toUpperCase();
    next();
});
exports.default = mongoose_1.default.model('Club', ClubSchema);
