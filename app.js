require("dotenv").config();

const express = require('express') ;
const cookieParser = require('cookie-parser')
const { authRouter } = require('./routes/auth');
const app = express() ;
const jwt = require('jsonwebtoken');
const { taskRouter } = require('./routes/tasks');

app.use(express.json()) ;
app.use(cookieParser()) ;

app.use('/auth' , authRouter )

app.use( ( req , res , next ) => {
    try{
        const token = req.cookies.token ; 
        const userDetails = jwt.verify( token , process.env.JWT_SECRET) ;
        next() ;
    }
    catch(err) {
         res.status(401).send({
            message : err.message 
         })
    }
})


app.use('/tasks' , taskRouter ) ;


module.exports = { app } ;