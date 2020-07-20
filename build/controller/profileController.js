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
exports.putExperience = exports.getUserProfile = exports.getProfiles = exports.postProfile = exports.getProfile = void 0;
const express_validator_1 = require("express-validator");
const Profile_1 = __importDefault(require("../models/Profile"));
// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
exports.getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_1.default.findOne({ user: req.user.id }).populate("user", ["name", "avatar"], "User");
        if (!profile) {
            return res.status(400).json({
                msg: "No profile found",
            });
        }
        return res.json(profile);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
exports.postProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors,
        });
    }
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin, } = req.body;
    // Build profile object
    const profileFields = {
        user: req.user.id,
        company,
        website,
        location,
        bio,
        status,
        githubusername,
    };
    if (skills) {
        profileFields.skills = skills
            .split(",")
            .map((skill) => skill.trim());
    }
    profileFields.social = {
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    };
    try {
        let profile = yield Profile_1.default.findOne({ user: req.user.id });
        if (profile) {
            profile = yield Profile_1.default.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.status(200).json({ msg: "Profile Updated", profile });
        }
        profile = new Profile_1.default(Object.assign({}, profileFields));
        yield profile.save();
        return res.status(200).json({ msg: "New Profile Added", profile });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Server error",
        });
    }
});
// @route   GET api/profile
// @desc    Get all user profile
// @access  Private
exports.getProfiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield Profile_1.default.find().populate("user", ["name", "avatar"], "User");
        res.status(200).json(profiles);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: "Server Error",
        });
    }
});
// @route   GET api/profile/user/:userId
// @desc    Get users profile
// @access  Public
exports.getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const profile = yield Profile_1.default.findOne({ user: userId }).populate("user", ["name", "avatar"], "User");
        if (!profile) {
            res.status(400).json({
                msg: "Cannot find profile",
            });
        }
        res.status(200).json({
            profile,
        });
    }
    catch (error) {
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
});
// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
exports.putExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
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
        const profile = yield Profile_1.default.findOne({ user: req.user.id });
        profile === null || profile === void 0 ? void 0 : profile.experience.unshift(experience);
        yield (profile === null || profile === void 0 ? void 0 : profile.save());
        res.status(200).json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            error,
        });
    }
});
