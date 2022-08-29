
const {Model,DataTypes}=require('sequelize')
const sequelize=require('../db')

class Artile extends Model{}

Artile.init({
    content:{
        type:DataTypes.STRING
    },
    
},{
    sequelize,
    modelName:'article',
   
})

module.exports=Artile