import { Router } from "express";

import * as userController from "../controller/userController";

import { body } from "express-validator";

const router = Router();

// @route   GET api/user
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty().trim().escape(),
    body("email", "Please include a valid email").isEmail().normalizeEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userController.getUser
);

export default router;
