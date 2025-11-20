# TASK MANAGER 

## PACKAGES USED 
1. EXPRESS JS
2. NODE JS
3. BCRYPT
4. JWT
5. COOKIE PARSER

## ALL ROUTES 
<pre>
 /auth/register 
 /auth/login 
 /tasks/all
 /tasks/create
 /tasks/:id (GET)
 /tasks/:id (PATCH)
 /tasks/:id (DELETE) 
</pre>

## PROJECT STRUCTURE
 <pre>project/
  src/
    config/
      db.js
    models/
      user.model.js
      task.model.js
      index.js
    routes/
      user.routes.js
      task.routes.js
    controllers/
      user.controller.js
      task.controller.js
    app.js
  .env
  .gitignore
  package.json
  README.md</pre>

## CLONE PROJECT 
git clone https://github.com/your/repo.git

## INSTALL DEPENDENCIES 
npm install

## ADD ENV 
<pre>DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=testdb
PORT=3000</pre>


## DATABASE CONFIG (db.config.js)

This is to setup the connection between JS and Sequelize.

<pre>const {Sequelize} = require('sequelize') ;

const {DB_NAME , PASSWORD , USER } = process.env ;
console.log(DB_NAME , PASSWORD , USER ) ;
const sequelize = new Sequelize( DB_NAME , USER , PASSWORD , {
    host : 'localhost' ,
    dialect : 'postgres'
});</pre>


module.exports = { sequelize } ;

## MODELS (model folder)
1. index.js
   
   This is to bring all the models together in one file and register in sequelize.models so sequelize.sync can make all the tables at once.
   some relations of the table need to be defined also and all models are exported from here and used in the entire project.

   
<pre>const { sequelize } = require('../config/db.config') ;
const { DataTypes } = require('sequelize') ;

const user = require('./user')( sequelize , DataTypes ) ;
const task = require('./task')( sequelize , DataTypes ) ;


user.hasMany(task , {foreignKey : 'userId'}) ;
task.belongsTo( user , { foreignKey : 'userId'} ) ;
module.exports = {
    user ,
    task ,
    sequelize
}</pre>

2. user.js
   
  <pre> module.exports = ( sequelize , DataTypes ) => {
    const user = sequelize.define(  "User" , {
        id : { primaryKey : true , type  : DataTypes.INTEGER , autoIncrement : true } ,
        username : { 
            type : DataTypes.STRING ,
            unique : true ,
            allowNull : false 
        },
        email : {
            type : DataTypes.STRING ,
            unique : true ,
            allowNull : false 
        } ,
        password : {
            type : DataTypes.STRING ,
            allowNull : false 
        }
    });

    return user ; 
}</pre>

3. task.js

   <pre>module.exports = ( sequelize , DataTypes ) => {
    const task = sequelize.define("task" , {
        id : {
            primaryKey : true ,
            autoIncrement : true ,
            type : DataTypes.INTEGER
        },
        title : {
            type : DataTypes.STRING ,
            allowNull : false 
        },
        description : {
            type : DataTypes.STRING ,
            allowNull : true 
        },
        priority : {
            type : DataTypes.STRING ,
            allowNull : false 
        },
        dueDate : {
            type : DataTypes.DATE,
            allowNull : false
        },
        status : {
            type : DataTypes.STRING ,
            allowNull : false 
        },
        userId : {
           type : DataTypes.INTEGER ,
           allowNull : false , 
           references : {
            model : "Users" ,
            key : "id"
           }
        }
    });
    return task ;
}</pre>

## ROUTES (routes folder)

This is the folder in which routes are defined specifically for common operations.

1. auth.js

  <pre>const express = require('express') ;
const { userController } = require('../controllers/user.controller');


const authRouter = express.Router() ;

authRouter.post('/register' , userController.registerUser ) ;
authRouter.post('/login' , userController.login ) ;


module.exports = { authRouter } ;</pre>

2. task.js

  <pre> const express = require('express') ;
const { taskController } = require('../controllers/task.controller');
const taskRouter = express.Router() ;

taskRouter.get('/all' , taskController.all)
taskRouter.post('/create' , taskController.createTask ) ;
taskRouter.get('/:id' , taskController.getTask) ;
taskRouter.patch('/:id' , taskController.updateTask) ;
taskRouter.delete('/:id' , taskController.deleteTask ) ;

module.exports = { taskRouter } ;</pre> 


## CONTROLLERS (controllers folder) 

1. task.controller.js

    Whole task related operations logic is here.
<pre>     const { task, user } = require("../model/index");

        const taskController = {
          all: async (req, res) => {
           try {
            const { filterBy, name, order, sort } = req.query;
             const query = {
             include: {
          model: user,
          attributes: [],
        },
      };
      if (filterBy && filterBy?.length != 0 && name && name?.length != 0) {
        query.where = { [filterBy]: name };
      }
      if (order && order?.length != 0 && ["asc", "desc"].includes(sort)) {
        query.order = [[order, sort]];
      } else {
        query.order = [["id", "asc"]];
      }
      console.log(order, sort);
      const response = await task.findAll(query);

      res.send({
        success: true,
        data: response,
        error: null,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        data: null,
        error: err.message,
      });
      }
    },
      createTask: async (req, res) => {
       try {
      const { title, description, priority, dueDate, status, userId } =
        req.body;
      if (
        title.length === 0 ||
        !["high", "low", "medium"].includes(priority) ||
        dueDate.length === 0 ||
        !["pending", "completed"].includes(status) ||
        !userId
      ) {
        return res.status(400).send("Please provide valid details.");
      }
      const response = await task.create({
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        status: status,
        userId: userId,
      });
      res.send({
        success: true,
        error: null,
      });
    } catch (error) {
      res.send(500).send({
        success: false,
        error: error.message || "Something went wrong.",
      });
    }
  },
  getTask: async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).send({
          success: false,
          data: null,
          error: "Please provide a valid id.",
        });
      }
      const response = await task.findOne({ where: { id: id } });
      res.send({
        success: true,
        data: response,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        data: null,
        error: error.message || "Something went wrong",
      });
    }
  },
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).send({
          success: false,
          error: "Please provide a valid id.",
        });
      }

      const response = await task.update(req.body, { where: { id: id } });
      res.send({
        success: true,
        error: null,
      });
    } catch (error) {
      res.send({
        success: false,
        error: error.message,
      });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        res.send({
          success: false,
          error: "Please provide a valid id.",
        });
      }

      const response = await task.destroy({
        where: { id: id },
      });

      res.send(
        res.send({
          success: true,
          error: null,
        })
      );
    } catch (error) {
      res.send({
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = { taskController };
</pre>


   2. user.controller.js

       All user related operations logic is here 

  <pre>const { user } = require("../model/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  registerUser: async (req, res) => {
    try {
      console.log(req.body);
      if (
        req.body.name.length === 0 ||
        req.body.password.length === 0 ||
        req.body.email.length === 0
      ) {
        return res.status(400).send({
          success: false,
          data: null,
          error: "Invalid Values.",
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const response = await user.create({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      res.send({
        success: true,
        data: response,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        data: null,
        error: error.message || "Something went wrong!",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { password, email } = req.body;
      if (password.length === 0 || email.length === 0) {
        return res.status(400).send({
          success: false,
          data: null,
          error: "Invalid Credentials.",
        });
      }
      const userDetails = await user.findOne({
        email: email,
      });
      console.log( userDetails ) ;
      if (await bcrypt.compare(password, userDetails.password)) {
        const obj = {
          id: userDetails.id,
          name: userDetails.username,
          email: userDetails.email,
        };
        const token = jwt.sign(obj, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.send({
          success: true,
          data: obj,
          error: null,
        });
      } else {
        return res.status(400).send("Invalid Password.");
      }
    } catch (err) {
        res.status(500).send({
            success : false ,
            data : null ,
            error : err.message || "Something went wrong."
        })
    }
  },
};

module.exports = {
  userController,
};
</pre>


## SERVER.JS (root file) 

This is the starting file of the project.

<pre>require("dotenv").config();

const { app } = require("./app");
const { sequelize, user, task } = require("./model/index");

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
  });
});
</pre>


## APP.JS

This is the file in which we can add all the middlewares and connect to all the routes.

<pre>const express = require('express') ;
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


module.exports = { app } ;</pre>

## TO START THE PROJECT 
<pre>node server.js</pre>



