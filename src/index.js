const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const Task = require("./models/Task");
const User = require("./models/user");
const main = async () => {
  // const task = await Task.findById("677d9fb1f2e1810047cf782b");
  // await task.populate("owner");
  // console.log(task.owner);
  // const user = await User.findById("677d9f7bf2e1810047cf7821");
  // await user.populate("tasks");
  // console.log(user.tasks);
};

main();
