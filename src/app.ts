import express from "express";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./connect";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import postsRoute from "./routes/postsRoute";
import profileRoute from "./routes/profileRoute";

// initialisation
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res, next) => {
  res.send("API Running");
});

// Routes
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
