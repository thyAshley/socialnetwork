import express from "express";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./connect";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("API Running");
});

// Connect Node Appplication
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  // Connect MongoDB
  connectDB();
});
