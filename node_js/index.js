const express = require('express')
const sequelize =require('./db')
const User =require('./models/User')

const app=express()
//using the middeleware
app.use(express.json())


sequelize.sync({force:true}).then(async()=>{
    for (let i=1; i<= 5;i++){
        const user ={
            username:`user${i}`,
            email:`user${i}@gmail.com`,
            password:`pg458`
        }
        await User.create(user)
    }
})


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
    // pagination
    const pageAsNumber=Number.parseInt(req.query.page)
    const sizeAsNumber=Number.parseInt(req.query.size)

    let page=0
    
    if(!Number.isNaN(pageAsNumber) && pageAsNumber >0){
        page = pageAsNumber
    }

    let size=10
     
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber>0 && sizeAsNumber<10){
        
            size=sizeAsNumber
    
    }

    
    try {
        const users =await User.findAndCountAll({
            // limit used to get limit number of data
            limit:size,  
            offset:page*size

              })
         res.send({
            content: users.rows,
            // give user number of pages 
            totalPages: Math.ceil(users.count / size)
         })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json(err)
    }
})

//get userr by id
// using next to throw the exeption to the exeption route



/* 

there is a conflict of request error
that i've been faced in this project
which when i want a not found request
(404) that post man shows me status
400 (bad req)

==> to solve this porblem i build
    function of each error req

*/


function InvalidIdExeption(){
    this.status=400,
    this.message="Invalid id"
}



function UserNotFoundExeption(){
    this.status=404,
    this.message="User not found"
}


app.get('/users/:id',async(req,res,next)=>{

    const req_id=Number.parseInt(req.params.id)

    
    try {
        //id must be number
        //route hundler

        if(Number.isNaN(req_id)){
            next( new InvalidIdExeption())
        }

        const users =await User.findOne({where:{id:req_id}})
        //  res.send(users)
         // user may be not found
         if(!users){
            next(new UserNotFoundExeption())
         }

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




// route exeption

app.use((err,req,res,next)=>{
    return res.status(err.status).send({
        message:err.message,
        timestamp:Date.now(),
        path:req.originalUrl
    })
})


app.listen(3000,()=>{
    console.log('server is running')
})