import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import Profile, { IProfileSchema } from "../models/Profile";
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

export const postProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors,
    });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Build profile object
  const profileFields = {
    user: req.user.id,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
  } as IProfileSchema;

  if (skills) {
    profileFields.skills = skills
      .split(",")
      .map((skill: string) => skill.trim());
  }
  profileFields.social = {
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json({ msg: "Profile Updated", profile });
    }

    profile = new Profile({ ...profileFields });
    await profile.save();
    return res.status(200).json({ msg: "New Profile Added", profile });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Server error",
    });
  }
};
