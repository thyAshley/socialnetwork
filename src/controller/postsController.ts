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

// @route GET api/posts
// @desc get all the available posts
// @access Publiuc
export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Posts.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @route Del api/posts/postId
// @desc delete post by ID
// @access Private
export const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    let post = await Posts.findById({ postId });

    if (post?.user!.toString() !== userId) {
      return res.status(400).json({
        msg: "You are not authorized to delete this post",
      });
    }
    await post.remove();
    res.status(200).json({
      msg: "Successfully deleted post",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
