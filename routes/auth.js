const express = require('express') ;
const { userController } = require('../controllers/user.controller');


const authRouter = express.Router() ;

authRouter.post('/register' , userController.registerUser ) ;
authRouter.post('/login' , userController.login ) ;


module.exports = { authRouter } ;
