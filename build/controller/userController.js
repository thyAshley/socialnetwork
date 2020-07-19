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
exports.getUser = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
exports.getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if Input from user is valid
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { name, email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "User already exist",
                    },
                ],
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const encPassword = yield bcryptjs_1.default.hash(password, salt);
        user = new User_1.default({
            name,
            email,
            password: encPassword,
        });
        try {
            yield user.save();
            console.log("user registered");
            return res.status(201).json({
                respose: "User created",
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});
