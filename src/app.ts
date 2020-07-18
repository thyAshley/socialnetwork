import express from "express";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./connect";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import postsRoute from "./routes/postsRoute";
import profileRoute from "./routes/profileRoute";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("API Running");
});

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.use("/profile", profileRoute);

// Connect Node Appplication
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  // Connect MongoDB
  connectDB();
});
