import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

interface body {
  name: string;
  email: string;
  password: string;
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if Input from user is valid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body as body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User already exist" }],
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: encPassword,
    });

    await user.save();
    const payload = {
      user: {
        id: user._id as string,
      },
    };

    jwt.sign(
      payload as object,
      process.env.JWT_SECRET as string,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res.status(201).json({
          msg: "Sign up successful",
          token,
        });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
};
