import { Router } from "express";
import { body } from "express-validator";

import * as profileController from "../controller/profileController";
import * as authController from "../controller/authController";

const router = Router();

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", authController.checkJWT, profileController.getProfile);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [
    authController.checkJWT,
    body("status", "Status is required").not().isEmpty(),
    body("skills", " Skills is required").not().isEmpty(),
  ],
  profileController.postProfile
);

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
router.put(
  "/experience",
  [
    authController.checkJWT,
    body("title", "Title is required").not().isEmpty(),
    body("company", "Company is required").not().isEmpty(),
    body("from", "From Date is required").not().isEmpty(),
  ],
  profileController.putExperience
);

// @route   DEL api/profile/experience/:expId
// @desc    Delete profile experience by id
// @access  Private
router.delete(
  "/experience/:expId",
  authController.checkJWT,
  profileController.delExperience
);

// @route   put api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    authController.checkJWT,
    body("school", "school is rqeuired").notEmpty(),
    body("degree", "Degree is required").notEmpty(),
    body("fieldofstudy", "Field of study is required").notEmpty(),
    body("from", "From date is required").notEmpty(),
  ],
  profileController.putEducation
);

// @route   DEL api/profile/education/:eduId
// @desc    Delete profile education by id
// @access  Private
router.delete(
  "/education/:eduId",
  authController.checkJWT,
  profileController.delEducation
);

// @route   DEL api/profile/education/:eduId
// @desc    Delete profile education by id
// @access  Private
router.delete(
  "/education/:eduId",
  authController.checkJWT,
  profileController.delEducation
);

// @route   GET api/profile/github/username
// @desc    Get user repos from Github
// @access  Public
router.get("/github/:username", profileController.getGithub);

export default router;
