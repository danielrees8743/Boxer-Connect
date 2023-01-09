"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clubController_1 = __importDefault(require("../controllers/clubController"));
const router = (0, express_1.Router)();
router.route('/').get(clubController_1.default.getAllClubs).post(clubController_1.default.addClub);
router
    .route('/:id')
    .get(clubController_1.default.getClub)
    .patch(clubController_1.default.updateClub)
    .delete(clubController_1.default.deleteClub);
exports.default = router;
