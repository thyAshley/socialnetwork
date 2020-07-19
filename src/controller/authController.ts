import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../models/User";

export const getAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById({ _id: req.user.id }).select("-password");
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      msg: "server error",
    });
  }
};

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }

  try {
    const decode = <any>jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decode.user;
    next();
  } catch (err) {
    return res.status(401).json({
      msg: "Token is not valid",
    });
  }
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error,
    });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        msg: "Login Fail, Invalid Credentials",
      });
    }

    const isAuth = await bcrypt.compare(password, user!.password);

    if (!isAuth) {
      return res.status(401).json({
        msg: "Login Fail, Invalid Credentials",
      });
    }

    const payload = {
      user: {
        id: user!._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          msg: "Login successful",
          token,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      msg: "Unable to login, please try again",
    });
  }
};
