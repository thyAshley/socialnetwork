"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delRemoveComment = exports.postAddComment = exports.postUnlikebyId = exports.postLikebyId = exports.deletePostById = exports.getAllPost = exports.postNewPost = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const Posts_1 = __importDefault(require("../models/Posts"));
// @route POST api/posts
// @desc Create a post
// @access Private
exports.postNewPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = express_validator_1.validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }
    try {
        const user = yield User_1.default.findById({ _id: req.user.id }).select("-password");
        const post = new Posts_1.default({
            user: req.user.id,
            text: req.body.text,
            name: user === null || user === void 0 ? void 0 : user.name,
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
        });
        yield post.save();
        return res.status(200).json({
            msg: "Post created",
            post,
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
    res.send("Posts route");
});
// @route GET api/posts
// @desc get all the available posts
// @access Publiuc
exports.getAllPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Posts_1.default.find().sort({ date: -1 });
        res.status(200).json(posts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// @route Del api/posts/postId
// @desc delete post by ID
// @access Private
exports.deletePostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const userId = req.user.id;
    try {
        let post = yield Posts_1.default.findById(postId);
        if ((post === null || post === void 0 ? void 0 : post.user.toString()) !== userId) {
            return res.status(400).json({
                msg: "You are not authorized to delete this post",
            });
        }
        yield post.remove();
        res.status(200).json({
            msg: "Successfully deleted post",
        });
    }
    catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).json({
            msg: "Server Error",
        });
    }
});
// @route PUT api/posts/like/:id
// @desc like a post
// @access Private
exports.postLikebyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const post = yield Posts_1.default.findById({ _id: req.params.id });
        if (((_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.filter((like) => { var _a; return ((_a = like.user) === null || _a === void 0 ? void 0 : _a.toString()) === req.user.id; }).length) > 0) {
            return res.status(400).json({
                msg: "You already liked this post",
            });
        }
        (_b = post === null || post === void 0 ? void 0 : post.likes) === null || _b === void 0 ? void 0 : _b.unshift({ user: req.user.id });
        yield (post === null || post === void 0 ? void 0 : post.save());
        return res.status(200).json({
            likes: [post.likes],
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
});
// @route PUT api/posts/unlike/:id
// @desc unlike a post
// @access Private
exports.postUnlikebyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    try {
        const post = yield Posts_1.default.findById({ _id: req.params.id });
        if (((_c = post === null || post === void 0 ? void 0 : post.likes) === null || _c === void 0 ? void 0 : _c.filter((like) => { var _a; return ((_a = like.user) === null || _a === void 0 ? void 0 : _a.toString()) === req.user.id; }).length) === 0) {
            return res.status(400).json({
                msg: "You have not liked this post",
            });
        }
        const removeIdx = (_d = post === null || post === void 0 ? void 0 : post.likes) === null || _d === void 0 ? void 0 : _d.map((like) => { var _a; return (_a = like.user) === null || _a === void 0 ? void 0 : _a.toString(); }).indexOf(req.user.id);
        console.log(removeIdx);
        (_e = post === null || post === void 0 ? void 0 : post.likes) === null || _e === void 0 ? void 0 : _e.splice(removeIdx, 1);
        yield (post === null || post === void 0 ? void 0 : post.save());
        return res.status(200).json({
            likes: [post.likes],
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
});
// @route POST api/posts/:postId/comment
// @desc Add a comment to a post
// @access Private
exports.postAddComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Posts_1.default.findOne({ _id: req.params.postId });
        const user = yield User_1.default.findOne({ _id: req.user.id });
        post === null || post === void 0 ? void 0 : post.comments.push({
            user: user._id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        });
        yield (post === null || post === void 0 ? void 0 : post.save());
        res.status(200).json({
            msg: "Added post",
            post,
        });
    }
    catch (error) {
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
});
// @route DEL api/posts/:postId/:commentId",
// @desc Delete comment from post
// @access Private
exports.delRemoveComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    try {
        const post = yield Posts_1.default.findById(req.params.postId);
        const comment = (_f = post === null || post === void 0 ? void 0 : post.comments) === null || _f === void 0 ? void 0 : _f.find((comment) => {
            return comment._id.toString() === req.params.commentId;
        });
        if (!comment) {
            return res.status(500).json({
                msg: "Post not found",
            });
        }
        if (((_g = comment.user) === null || _g === void 0 ? void 0 : _g.toString()) !== req.user.id) {
            return res.status(401).json({
                msg: "Not authorize to perform this action",
            });
        }
        const newPost = (_h = post === null || post === void 0 ? void 0 : post.comments) === null || _h === void 0 ? void 0 : _h.filter((comment) => {
            var _a;
            return (((_a = comment._id) === null || _a === void 0 ? void 0 : _a.toString()) !== req.params.commentId &&
                comment.user !== req.user.id);
        });
        post.comments = newPost;
        yield (post === null || post === void 0 ? void 0 : post.save());
        return res.status(200).json({
            msg: "Post Added",
            post,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server Error",
        });
    }
});
