const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/task-manager-api";
const databaseName = "task-manager-api";

mongoose.connect(uri).then(() => console.log("Connected!!!!"));
