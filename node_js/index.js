const express = require('express')
const sequelize =require('./db')
const User =require('./models/User')

const app=express()
//using the middeleware
app.use(express.json())

sequelize.sync({force:true}).then(()=>console.log('database is ready'))


//insert user
app.post('/users',async(req,res)=>{
    try {

        const user = await User.create(req.body)
        return res.json(user)
        
    } catch (err) {
        console.error(err.message)
        return res.status(500).json(err)
    }
})

// get all users

app.get('/users',async(req,res)=>{
    try {
        const users =await User.findAll()
         res.send(users)
    } catch (err) {
        console.error(err.message)
        return res.status(500).json(err)
    }
})
//get userr by id

app.get('/users/:id',async(req,res)=>{
    const req_id=req.params.id
    try {
        const users =await User.findOne({where:{id:req_id}})
         res.send(users)
    } catch (err) {
        console.error(err.message)
        return res.status(500).json(err)
    }
})

//udpate user
app.put('/users/:id',async(req,res)=>{
    const req_id=req.params.id
    try {
        const user =await User.findOne({where:{id:req_id}})
         user.username=req.body.username
         await user.save()
         return res.json(user)
    } catch (err) {
        console.error(err.message)
        return res.status(500).json(err)
    }
})

// delete user 

app.delete('/users/:id',async(req,res)=>{
    const req_id=req.params.id
    try {
        const user =await User.destroy({where:{id:req_id}})
         return res.json('user was deleted')
    } catch (err) {
        console.error(err.message)
        return res.status(500).json(err)
    }
})





app.listen(3000,()=>{
    console.log('server is running')
})