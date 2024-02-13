// config env
require("dotenv").config();
// project external files
const express = require("express");
const path = require("path");

// project files
const apiRouter = require("./apiRouter");


const app = express();

const PORT = process.env.APP_PORT || 3025;

app.use(express.json());

app.use("public", express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.use("*", (req, res) => {
  return res.status(404).json("UNKNOWN ROUTE");
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
