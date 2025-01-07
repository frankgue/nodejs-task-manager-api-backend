require("../src/db/mongoose");
const Task = require("../src/models/Task");

// Task.findByIdAndDelete("677b9aad528e3bc0624f1442")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: true });
//   })
//   .then((task) => {
//     console.log(task);
//   })
//   .catch((e) => console.log(e));

const deleteTaskAndCount = async (id) => {
  const result = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("677b9ac0528e3bc0624f1446")
  .then((count) => {
    console.log("Incompleted Task size => ", count);
  })
  .catch((e) => console.log(e));
