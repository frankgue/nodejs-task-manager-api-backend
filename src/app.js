const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const auth = require("./middleware/auth");
require("dotenv").config({
  path: ".test.env",
});

const multer = require("multer");

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

module.exports = app;
