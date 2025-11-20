const express = require('express') ;
const { taskController } = require('../controllers/task.controller');
const taskRouter = express.Router() ;

taskRouter.get('/all' , taskController.all)
taskRouter.post('/create' , taskController.createTask ) ;
taskRouter.get('/:id' , taskController.getTask) ;
taskRouter.patch('/:id' , taskController.updateTask) ;
taskRouter.delete('/:id' , taskController.deleteTask ) ;

module.exports = { taskRouter } ;