"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_1 = __importDefault(require("./connect"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const postsRoute_1 = __importDefault(require("./routes/postsRoute"));
const profileRoute_1 = __importDefault(require("./routes/profileRoute"));
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res, next) => {
    res.send("API Running");
});
app.use("/user", userRoute_1.default);
app.use("/auth", authRoute_1.default);
app.use("/posts", postsRoute_1.default);
app.use("/profile", profileRoute_1.default);
// Connect Node Appplication
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
    // Connect MongoDB
    connect_1.default();
});
