import { Router } from "express";

import * as profileController from "../controller/profileController";
import * as authController from "../controller/authController";

const router = Router();

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", authController.checkJWT, profileController.getProfile);

export default router;
