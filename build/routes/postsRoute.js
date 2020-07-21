"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const postsController = __importStar(require("../controller/postsController"));
const authController = __importStar(require("../controller/authController"));
const router = express_1.Router();
// @route POST api/posts
// @desc Create a post
// @access Private
router.post("/", [authController.checkJWT, express_validator_1.check("text", "Text must not be empty").notEmpty()], postsController.postNewPost);
// @route GET api/posts
// @desc get all the available posts
// @access Public
router.get("/", postsController.getAllPost);
// @route DEL api/posts/postId
// @desc delete post by ID
// @access Private
router.delete("/:postId", authController.checkJWT, postsController.deletePostById);
// @route PUT api/posts/like/:id
// @desc like a post
// @access Private
router.put("/like/:id", authController.checkJWT, postsController.postLikebyId);
// @route PUT api/posts/unlike/:id
// @desc unlike a post
// @access Private
router.put("/unlike/:id", authController.checkJWT, postsController.postUnlikebyId);
// @route POST api/posts/comment/:postId
// @desc Add a comment to a post
// @access Private
router.post("/comment/:postId", [authController.checkJWT, express_validator_1.check("text", "A comment is required").notEmpty()], postsController.postAddComment);
// @route DEL api/posts/:postId/:commentId",
// @desc Delete comment from post
// @access Private
router.delete("/:postId/:commentId", authController.checkJWT, postsController.delRemoveComment);
exports.default = router;
