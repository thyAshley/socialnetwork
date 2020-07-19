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
exports.postProfile = exports.getProfile = void 0;
const express_validator_1 = require("express-validator");
const Profile_1 = __importDefault(require("../models/Profile"));
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
