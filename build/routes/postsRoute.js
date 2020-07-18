"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// @route   api/posts
// @desc    Test route
// @access  Public
router.get("/", (req, res, next) => {
    res.send("Post Route");
});
exports.default = router;
