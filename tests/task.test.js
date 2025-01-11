const request = require("supertest");
const Task = require("../src/models/Task");
const app = require("../src/app");
const {
  setupDatabase,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  taskOne,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create a task for a user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Task created from Test",
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should get all tasks for userOne", async () => {
  const response = await request(app)
    .get(`/tasks`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("Test delete task security", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
