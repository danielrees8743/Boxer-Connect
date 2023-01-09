"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const shortid_1 = __importDefault(require("shortid"));
const BoxerSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
    },
    nickname: {
        type: String,
    },
    dob: {
        type: Date,
        required: [true, 'Please enter your date of birth'],
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    club: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Club',
        // required: [true, 'Please enter your club'],
    },
    weight: {
        type: Number,
        required: [true, 'Please enter your weight in kg'],
    },
    height: {
        type: Number,
        required: [true, 'Please enter your height in cm'],
    },
    wins: {
        type: Number,
        required: [true, 'Please enter your wins'],
    },
    losses: {
        type: Number,
        required: [true, 'Please enter your losses'],
    },
    draws: {
        type: Number,
        required: [true, 'Please enter your draws'],
    },
    stance: {
        type: String,
        required: [true, 'Please enter your stance, either orthodox or southpaw'],
    },
    id: {
        type: String,
    },
    picture: {
        type: String,
    },
    licenseNumber: {
        type: String,
        required: [true, 'Please enter your license number'],
    },
    fitToFight: {
        type: Boolean,
        required: [true, 'Please enter if you are fit to fight'],
    },
});
BoxerSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const age = new Date().getFullYear() - this.dob.getFullYear();
        this.age = age;
        next();
    });
});
BoxerSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.id = shortid_1.default.generate();
        next();
    });
});
exports.default = mongoose_1.default.model('Boxer', BoxerSchema);
