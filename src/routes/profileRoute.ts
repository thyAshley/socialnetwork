import { Router } from "express";

import * as profileController from "../controller/profileController";

const router = Router();

// @route   api/profile
// @desc    Test route
// @access  Public
router.get("/", profileController.getProfile);

export default router;
