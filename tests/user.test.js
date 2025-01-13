const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { setupDatabase, userOne, userOneId } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup a user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "John",
      email: "john@example.com",
      password: "12345678",
    })
    .expect(201);

  //Assert that the database was changed properly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "John",
      email: "john@example.com",
    },
    token: user.tokens[0].token,
  });
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "frankgue@yahoo.fr",
      password: "lololdsd",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar to account", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpeg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid users fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Frank" })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toBe(response.body.name);
});

test("Should not update invalid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "Yaounde" })
    .expect(400);
});
