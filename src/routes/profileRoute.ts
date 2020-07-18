import { Router } from "express";

const router = Router();

// @route   api/profile
// @desc    Test route
// @access  Public
router.get("/", (req, res, next) => {
  res.send("Profile Route");
});

export default router;
