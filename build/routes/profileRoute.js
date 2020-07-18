"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// @route   api/profile
// @desc    Test route
// @access  Public
router.get("/", (req, res, next) => {
    res.send("Profile Route");
});
exports.default = router;
