import { Router } from "express";

import * as userController from "../controller/userController";

import { check } from "express-validator";

const router = Router();

// @route   POST api/user/signup
// @desc    Register user
// @access  Public
router.post(
  "/signup",
  [
    check("name", "Name is required").notEmpty().trim().escape(),
    check("email", "Please include a valid email").isEmail().normalizeEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userController.getUser
);

export default router;
