import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import axios from "axios";

import Profile, { IProfileSchema } from "../models/Profile";
import User from "../models/User";

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
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

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
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

// @route   GET api/profile
// @desc    Get all user profile
// @access  Private
export const getProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profiles = await Profile.find().populate(
      "user",
      ["name", "avatar"],
      "User"
    );
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// @route   GET api/profile/user/:userId
// @desc    Get users profile
// @access  Public
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      ["name", "avatar"],
      "User"
    );
    if (!profile) {
      res.status(400).json({
        msg: "Cannot find profile",
      });
    }
    res.status(200).json({
      profile,
    });
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      res.status(400).json({
        msg: "Cannot find profile",
      });
    }
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
export const putExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: errors,
    });
  }
  const { title, company, location, from, to, current, description } = req.body;

  const experience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile?.experience.unshift(experience);

    await profile?.save();

    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error,
    });
  }
};

// @route   DEL api/profile/experience/:expId
// @desc    Delete profile experience by id
// @access  Private
export const delExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expId = req.params.expId;
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      res.status(400).json({
        msg: "Profile not found",
      });
    }
    const newexperience = profile?.experience.filter((exp) => {
      return exp._id?.toString() !== expId;
    }) as IProfileSchema["experience"];

    profile!.experience = newexperience;
    await profile?.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// @route   put api/profile/education
// @desc    Add profile education
// @access  Private
export const putEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const education = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors,
      });
    }
    const profile = await Profile.findOne({ user: req.user.id });
    profile?.education.unshift(education);
    await profile?.save();
    res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   DEL api/profile/education/:eduId
// @desc    Delete profile education by id
// @access  Private
export const delEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const eduId = req.params.eduId;
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      res.status(400).json({
        msg: "Profile not found",
      });
    }
    const newEducation = profile?.education.filter((edu) => {
      return edu._id?.toString() !== eduId;
    }) as IProfileSchema["education"];

    profile!.education = newEducation;
    await profile?.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// @route   GET api/profile/github/username
// @desc    Get user repos from Github
// @access  Public
export const getGithub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}`
    );

    return res.status(200).json({
      response: response.data,
    });
  } catch (error) {
    if (error.response.status === 404) {
      return res.status(404).json({
        response: "No github user found",
      });
    }
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
