import { Router } from "express";

import * as authController from "../controller/authController";

const router = Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", authController.getAuth);

export default router;
