import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

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
        errors: [
          {
            msg: "User already exist",
          },
        ],
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: encPassword,
    });
    try {
      await user.save();
      console.log("user registered");
      return res.status(201).json({
        respose: "User created",
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
