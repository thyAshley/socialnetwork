import { Router } from "express";

import * as userController from "../controller/userController";

import { check } from "express-validator";

const router = Router();

// @route   GET api/user
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userController.getUser
);

export default router;
