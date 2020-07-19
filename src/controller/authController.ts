import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        msg: "Login Fail, Invalid Email or Password",
      });
    }

    const isAuth = await bcrypt.compare(password, user!.password);

    const payload = {
      user: {
        id: user!._id,
      },
    };
    if (isAuth) {
      const token = jwt.sign(payload, process.env.JWT_SECRET as string);
      return res.status(200).json({
        token,
      });
    } else {
      return res.status(500).json({
        msg: "Login Fail, Invalid Email or Password",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Unable to login, please try again",
    });
  }
};
