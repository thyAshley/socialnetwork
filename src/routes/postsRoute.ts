import { Router } from "express";
import { check } from "express-validator";

import * as postsController from "../controller/postsController";
import * as authController from "../controller/authController";

const router = Router();

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  "/",
  [authController.checkJWT, check("text", "Text must not be empty").notEmpty()],
  postsController.postNewPost
);

// @route GET api/posts
// @desc get all the available posts
// @access Public
router.get("/", postsController.getAllPost);

// @route DEL api/posts/postId
// @desc delete post by ID
// @access Private
router.delete(
  "/:postId",
  authController.checkJWT,
  postsController.deletePostById
);

// @route PUT api/posts/like/:id
// @desc like a post
// @access Private
router.put("/like/:id", authController.checkJWT, postsController.postLikebyId);

// @route PUT api/posts/unlike/:id
// @desc unlike a post
// @access Private
router.put(
  "/unlike/:id",
  authController.checkJWT,
  postsController.postUnlikebyId
);

// @route POST api/posts/comment/:postId
// @desc Add a comment to a post
// @access Private
router.post(
  "/comment/:postId",
  [authController.checkJWT, check("text", "A comment is required").notEmpty()],
  postsController.postAddComment
);

// @route DEL api/posts/:postId/:commentId",
// @desc Delete comment from post
// @access Private
router.delete(
  "/:postId/:commentId",
  authController.checkJWT,
  postsController.delRemoveComment
);
export default router;
