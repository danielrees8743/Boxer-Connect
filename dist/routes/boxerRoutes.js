"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boxerController_1 = __importDefault(require("../controllers/boxerController"));
const router = (0, express_1.Router)();
router.route('/').get(boxerController_1.default.getAllBoxers).post(boxerController_1.default.addBoxer);
router
    .route('/:id')
    .get(boxerController_1.default.getBoxer)
    .patch(boxerController_1.default.updateBoxer)
    .delete(boxerController_1.default.deleteBoxer);
exports.default = router;
