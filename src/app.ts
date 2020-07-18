import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("API Running");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
