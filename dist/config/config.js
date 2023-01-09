"use strict";
//info General configuration file, all the configuration will be stored here
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
dotenv_1.default.config({ path: './config.env' });
exports.config = {
    app: {
        port: process.env.PORT || 8080,
        name: 'boxer-connect',
    },
    db: {
        collection: process.env.DB_COLLECTION,
        userName: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
};
exports.theme = {
    info: colors_1.default.magenta.italic,
    error: colors_1.default.red.italic,
    success: colors_1.default.green.italic.dim,
    warning: colors_1.default.yellow.italic.dim,
};
exports.default = exports.config;
