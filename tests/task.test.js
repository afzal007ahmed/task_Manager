const request = require("supertest");
const { app } = require("../app");
let token;

test("login", async () => {
  const response = await request(app).post("/auth/login").send({
    email: "user@gmail.com",
    password: "abc123",
  });
  expect(response.statusCode).toBe(200);
  expect(response.body.data).not.toBeNull();
  token = response.headers['set-cookie'];
});

test("Testing Tasks Routes.", async () => {
  const response = await request(app).get("/tasks/all").set("cookie", token);
  expect(response.statusCode).toBe(200);
  expect(response.body.data).not.toBeNull();
});
