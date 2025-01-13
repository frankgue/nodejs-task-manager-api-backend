const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/User.js");
const taskRouter = require("./routers/Task.js");
const auth = require("./middleware/Auth.js");
require("dotenv").config({
  path: ".test.env",
});

const multer = require("multer");

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

module.exports = app;
