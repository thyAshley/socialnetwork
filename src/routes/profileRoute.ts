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

export default router;
