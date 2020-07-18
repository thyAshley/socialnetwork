"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_1 = __importDefault(require("./connect"));
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res, next) => {
    res.send("API Running");
});
// Connect Node Appplication
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
    // Connect MongoDB
    connect_1.default();
});
