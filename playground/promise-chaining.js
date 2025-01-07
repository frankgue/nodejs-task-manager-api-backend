require("../src/db/mongoose");
const User = require("../src/models/User");

// User.findByIdAndUpdate("677b0479de2cd078e378c134", { age: 22 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 22 });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("677b03cab1d8bbff67ecf38d", 1)
  .then((count) => {
    console.log(count);
  })
  .catch((err) => console.log(err));
