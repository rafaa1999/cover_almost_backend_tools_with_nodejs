const {Sequelize}=require('sequelize')



const sequelize = new Sequelize('node_app','rafa','1999',{
    dialect:'sqlite',
    host:'./des.sqlite'
})


module.exports=sequelize