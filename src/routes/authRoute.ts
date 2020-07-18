import { Router } from "express";

const router = Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", (req, res, next) => res.send("Auth Route"));

export default router;
