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
exports.deleteUser = exports.postLogin = exports.checkJWT = exports.getAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
// @route   GET api/auth
// @desc    Get auth user information
// @access  Private
exports.getAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById({ _id: req.user.id }).select("-password");
        res.status(200).json({
            user,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "server error",
        });
    }
});
exports.checkJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            msg: "No token, authorization denied",
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        console.log(req.user);
        const user = yield User_1.default.findById(req.user.id);
        if (!user) {
            return res.status(401).json({
                msg: "Unauthorized",
            });
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            msg: "Token is not valid",
        });
    }
});
// @route   POST api/login
// @desc    Login the user in and issue a token
// @access  Public
exports.postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = express_validator_1.validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            error,
        });
    }
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                msg: "Login Fail, Invalid Credentials",
            });
        }
        const isAuth = yield bcryptjs_1.default.compare(password, user.password);
        if (!isAuth) {
            return res.status(401).json({
                msg: "Login Fail, Invalid Credentials",
            });
        }
        const payload = {
            user: {
                id: user._id,
            },
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err)
                throw err;
            return res.status(200).json({
                msg: "Login successful",
                token,
            });
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Unable to login, please try again",
        });
    }
});
// @route   POST api/user/delete
// @desc    Delete the user, posts and profile
// @access  Private
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Profile_1.default.findOneAndRemove({ user: req.user.id });
        yield User_1.default.findOneAndRemove({ _id: req.user.id });
        res.status(204).json({
            msg: "user successfully deleted",
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: "Server Error",
        });
    }
});
