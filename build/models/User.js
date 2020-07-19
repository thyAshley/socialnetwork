"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "User must have a name"],
    },
    email: {
        type: String,
        required: [true, "User must have a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "User must have a password"],
    },
    avatar: {
        type: String,
        default: "https://png.pngitem.com/pimgs/s/508-5087236_tab-profile-f-user-icon-white-fill-hd.png",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
