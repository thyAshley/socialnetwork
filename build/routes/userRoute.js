"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controller/userController"));
const express_validator_1 = require("express-validator");
const router = express_1.Router();
// @route   POST api/user/signup
// @desc    Register user
// @access  Public
router.post("/signup", [
    express_validator_1.body("name", "Name is required").not().isEmpty().trim().escape(),
    express_validator_1.body("email", "Please include a valid email").isEmail().normalizeEmail(),
    express_validator_1.body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
], userController.getUser);
exports.default = router;
