const {Sequelize} = require('sequelize') ;

const {DB_NAME , PASSWORD , USER } = process.env ;
console.log(DB_NAME , PASSWORD , USER ) ;
const sequelize = new Sequelize( DB_NAME , USER , PASSWORD , {
    host : 'localhost' ,
    dialect : 'postgres'
});


module.exports = { sequelize } ;