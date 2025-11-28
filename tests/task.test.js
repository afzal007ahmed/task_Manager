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
  token = response.headers["set-cookie"];
});

test("Get All Tasks Route.", async () => {
  const response = await request(app).get("/tasks/all").set("cookie", token);
  expect(response.statusCode).toBe(200);
  expect(response.body.data).not.toBeNull();
});

test("Create Task Route", async () => {
    const response = await request(app).post("/tasks/create").send({
    title: "Test1",
    description: "Just testing",
    priority: "low",
    dueDate: "11-29-2025",
    status: "pending",
    userId: 1,
  }).set('cookie' , token);
   expect(response.statusCode).toBe(200) ;
   expect( response.body ).not.toBeNull() ;
});


test( "Get a single task" , async() => {
  const response = await request(app).get('/tasks/2').set('cookie' , token); ;
  expect(response.statusCode).toBe(200) ;
  expect( response.body.data ).not.toBeNull() ;
})


test("Update a task by task Id " , async() => {
   const response = await request(app).patch('/tasks/4' ).send({
    title : "Updated Task"
   }).set('cookie' , token) ;
   expect( response.statusCode ).toBe(200) ;
   expect( response.body.data ).not.toBeNull() ;
})



test("Delete Task by Id" , async() => {
  const response = await request(app).delete('/tasks/4').set('cookie' , token  ) ;
  expect( response.statusCode ).toBe(200) ;
  expect( response.body.data ).not.toBeNull()
})




