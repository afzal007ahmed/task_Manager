module.exports = ( sequelize , DataTypes ) => {
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
}