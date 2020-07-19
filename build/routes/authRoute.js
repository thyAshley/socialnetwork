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
const express_validator_1 = require("express-validator");
const authController = __importStar(require("../controller/authController"));
const router = express_1.Router();
// @route   GET api/auth
// @desc    Get auth user information
// @access  Private
router.get("/", authController.checkJWT, authController.getAuth);
// @route   POST api/login
// @desc    Login the user in and issue a token
// @access  Public
router.post("/login", [
    express_validator_1.body("email", "email is required").isEmail(),
    express_validator_1.body("password", "password is required").not().notEmpty(),
], authController.postLogin);
// @route   POST api/user/delete
// @desc    Delete the user, posts and profile
// @access  Private
router.delete("/delete", authController.checkJWT, authController.deleteUser);
exports.default = router;
