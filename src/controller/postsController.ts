import { Request, Response, NextFunction, json } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import Profile from "../models/Profile";
import Posts, { IPostSchema } from "../models/Posts";
import mongoose from "mongoose";

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
    let post = await Posts.findById(postId);
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

// @route PUT api/posts/like/:id
// @desc like a post
// @access Private
export const postLikebyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Posts.findById({ _id: req.params.id });

    if (
      post?.likes?.filter((like) => like.user?.toString() === req.user.id)
        .length! > 0
    ) {
      return res.status(400).json({
        msg: "You already liked this post",
      });
    }
    post?.likes?.unshift({ user: req.user.id });
    await post?.save();
    return res.status(200).json({
      likes: [post!.likes],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

// @route PUT api/posts/unlike/:id
// @desc unlike a post
// @access Private
export const postUnlikebyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Posts.findById({ _id: req.params.id });

    if (
      post?.likes?.filter((like) => like.user?.toString() === req.user.id)
        .length! === 0
    ) {
      return res.status(400).json({
        msg: "You have not liked this post",
      });
    }
    const removeIdx: number = post
      ?.likes!?.map((like) => like.user?.toString())
      .indexOf(req.user.id);
    console.log(removeIdx);
    post?.likes?.splice(removeIdx, 1);
    await post?.save();
    return res.status(200).json({
      likes: [post!.likes],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

// @route POST api/posts/:postId/comment
// @desc Add a comment to a post
// @access Private
export const postAddComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Posts.findOne({ _id: req.params.postId });

    const user = await User.findOne({ _id: req.user.id });
    post?.comments!.push({
      user: user!._id,
      text: req.body.text,
      name: user!.name,
      avatar: user!.avatar,
    });

    await post?.save();
    res.status(200).json({
      msg: "Added post",
      post,
    });
  } catch (error) {
    console.log(error.kind);
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        msg: "Post does not exist, please try again later",
      });
    }
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

// @route DEL api/posts/:postId/:commentId",
// @desc Delete comment from post
// @access Private
export const delRemoveComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Posts.findById(req.params.postId);
    const comment = post?.comments?.find((comment) => {
      return comment._id!.toString() === req.params.commentId;
    });
    if (!comment) {
      return res.status(500).json({
        msg: "Post not found",
      });
    }

    if (comment!.user?.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "Not authorize to perform this action",
      });
    }

    const newPost = post?.comments?.filter((comment) => {
      return (
        comment._id?.toString() !== req.params.commentId &&
        comment.user !== req.user.id
      );
    }) as IPostSchema["comments"];

    post!.comments = newPost;
    await post?.save();
    return res.status(200).json({
      msg: "Post Added",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
