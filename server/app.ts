import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "API is working sdssdssssasf" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
