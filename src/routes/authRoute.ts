import { Router } from "express";
import { body } from "express-validator";

import * as authController from "../controller/authController";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

const router = Router();

// @route   GET api/auth
// @desc    Get auth user information
// @access  Private
router.get("/", authController.checkJWT, authController.getAuth);

// @route   POST api/login
// @desc    Login the user in and issue a token
// @access  Public
router.post(
  "/login",
  [
    body("email", "email is required").isEmail(),
    body("password", "password is required").not().notEmpty(),
  ],
  authController.postLogin
);

// @route   POST api/user/delete
// @desc    Delete the user, posts and profile
// @access  Private
router.delete("/delete", authController.checkJWT, authController.deleteUser);

export default router;
