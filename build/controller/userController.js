"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const express_validator_1 = require("express-validator");
exports.getUser = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    res.send("User route");
};
