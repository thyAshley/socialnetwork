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

export default router;
