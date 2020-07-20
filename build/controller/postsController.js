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
exports.postUnlikebyId = exports.postLikebyId = exports.deletePostById = exports.getAllPost = exports.postNewPost = void 0;
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
        let post = yield Posts_1.default.findById({ postId });
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
