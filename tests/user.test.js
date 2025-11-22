const {app} = require('../app.js') ;
const request = require('supertest') ;
const { userController } = require('../controllers/user.controller');


test("Login User" , async() => {
    const response = await request(app).post('/auth/login').send({email : "user@gmail.com" , password : "abc123"} );
    expect( response.statusCode ).toBe(200) ;
    expect( response.body.data ).not.toBeNull() ;
})