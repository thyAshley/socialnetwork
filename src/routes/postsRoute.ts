import { Router } from "express";

import * as postsController from "../controller/postsController";
const router = Router();

// @route   api/posts
// @desc    Test route
// @access  Public
router.get("/", postsController.getPosts);

export default router;
