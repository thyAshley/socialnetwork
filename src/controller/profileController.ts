import { Request, Response, NextFunction } from "express";

import Profile from "../models/Profile";
import User from "../models/User";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"],
      "User"
    );

    if (!profile) {
      return res.status(400).json({
        msg: "No profile found",
      });
    }

    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
