
const {Model,DataTypes}=require('sequelize')
const sequelize=require('../db')

class User extends Model{}

User.init({
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    
    password:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:'user',
    // delete the createAt and updateAt columns
    timestamps: false
})

module.exports=User