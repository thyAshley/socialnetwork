import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import connectDB from "./connect";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import postsRoute from "./routes/postsRoute";
import profileRoute from "./routes/profileRoute";

// initialisation
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/profile", profileRoute);

if (process.env.NODE_ENV === "production") {
  // Set Statoc Fp;der
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Connect Node Appplication
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  // Connect MongoDB
  connectDB();
});
