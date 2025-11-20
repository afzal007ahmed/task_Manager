
const { sequelize } = require('../config/db.config') ;
const { DataTypes } = require('sequelize') ;

const user = require('./user')( sequelize , DataTypes ) ;
const task = require('./task')( sequelize , DataTypes ) ;


user.hasMany(task , {foreignKey : 'userId'}) ;
task.belongsTo( user , { foreignKey : 'userId'} ) ;
module.exports = {
    user ,
    task ,
    sequelize
}