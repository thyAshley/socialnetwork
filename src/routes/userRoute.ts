import { Router } from "express";

import * as userController from "../controller/userController";

const router = Router();

// @route   GET api/user
// @desc    Test Route
// @access  Public
router.get("/", userController.getUser);

export default router;
