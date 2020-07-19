import { Router } from "express";

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
// @access  Public
router.get("/", authController.checkJWT, authController.getAuth);

// @route   POST api/login
// @desc    Login in the user
// @access  Public
router.post("/login", authController.postLogin);

export default router;
