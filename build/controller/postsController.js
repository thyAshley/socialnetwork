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
exports.postNewPost = void 0;
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
