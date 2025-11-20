module.exports = ( sequelize , DataTypes ) => {
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
}