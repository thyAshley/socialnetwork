import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import Profile from "../models/Profile";
import Posts from "../models/Posts";

// @route POST api/posts
// @desc Create a post
// @access Private
export const postNewPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }
  try {
    const user = await User.findById({ _id: req.user.id }).select("-password");
    const post = new Posts({
      user: req.user.id,
      text: req.body.text,
      name: user?.name,
      avatar: user?.avatar,
    });
    await post.save();
    return res.status(200).json({
      msg: "Post created",
      post,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
  res.send("Posts route");
};
