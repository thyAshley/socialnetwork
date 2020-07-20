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
const profileController = __importStar(require("../controller/profileController"));
const authController = __importStar(require("../controller/authController"));
const router = express_1.Router();
// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", authController.checkJWT, profileController.getProfile);
// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post("/", [
    authController.checkJWT,
    express_validator_1.body("status", "Status is required").not().isEmpty(),
    express_validator_1.body("skills", " Skills is required").not().isEmpty(),
], profileController.postProfile);
// @route   GET api/profile
// @desc    Get all users profile
// @access  Public
router.get("/", profileController.getProfiles);
// @route   GET api/profile/user/:userId
// @desc    Get users profile
// @access  Public
router.get("/user/:userId", profileController.getUserProfile);
// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put("/experience", [
    authController.checkJWT,
    express_validator_1.body("title", "Title is required").not().isEmpty(),
    express_validator_1.body("company", "Company is required").not().isEmpty(),
    express_validator_1.body("from", "From Date is required").not().isEmpty(),
], profileController.putExperience);
// @route   DEL api/profile/experience/:expId
// @desc    Delete profile experience by id
// @access  Private
router.delete("/experience/:expId", authController.checkJWT, profileController.delExperience);
// @route   put api/profile/education
// @desc    Add profile education
// @access  Private
router.put("/education", [
    authController.checkJWT,
    express_validator_1.body("school", "school is rqeuired").notEmpty(),
    express_validator_1.body("degree", "Degree is required").notEmpty(),
    express_validator_1.body("fieldofstudy", "Field of study is required").notEmpty(),
    express_validator_1.body("from", "From date is required").notEmpty(),
], profileController.putEducation);
exports.default = router;
