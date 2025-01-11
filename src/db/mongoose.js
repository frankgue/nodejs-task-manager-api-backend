const mongoose = require("mongoose");
require("dotenv").config({
  path: ".test.env",
});

const uri = process.env.MONGODB_URL;

mongoose.connect(uri).then(() => console.log("Connected!!!!"));
