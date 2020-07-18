import { Router } from "express";

const router = Router();

// @route   api/posts
// @desc    Test route
// @access  Public
router.get("/", (req, res, next) => {
  res.send("Post Route");
});

export default router;
