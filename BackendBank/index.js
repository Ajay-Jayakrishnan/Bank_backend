//import express and assign it to a variable
const express = require('express')
//import data service
const dataService = require('./services/dataservice')
// using express to crate server app
const app = express()
//to parse  json requests
app.use(express.json())
//importing json web token to use in index
const jwt = require("jsonwebtoken")
//import cors to bind different port numbers
const cors = require('cors')
//use cors
app.use(cors({
    origin:'http://localhost:4200'
}))
const { User } = require('./services/db')
//defining router specific middleware application

const jwtMiddleware = (req,res,next)=>{
    console.log("inside middleware application");
    //to fetch token
    const token = req.headers['x-headtoken']
    try{
        const data = jwt.verify(token,'supersecretkey')
        console.log(data);
        next()

    }
    catch{
        
            res.status(404).json({
                status:false,
                statusCode:404,
                message:"please login"
            })
            
        }
    }

   

app.post('/register',(req,res)=>{
    console.log(req.body);
dataService.register(req.body.usename,req.body.acno,req.body.password).then(result=>{
    res.status(result.statusCode).json(result)
})



})
app.post('/login',(req,res)=>{
    console.log(req.body);
dataService.login(req.body.acno,req.body.pswd).then(result=>{
    res.status(result.statusCode).json(result)
   
})

})
app.post('/deposit',jwtMiddleware ,(req,res)=>{
    console.log(req.body);

dataService.deposit(req.body.acno,req.body.pswd,req.body.amt).then(result=>{
    res.status(result.statusCode).json(result)
})


})
app.post('/withdraw',jwtMiddleware ,(req,res)=>{
    
    console.log(req.body);
dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt).then(result=>{
    res.status(result.statusCode).json(result)
})


})
app.post('/getTranscation',(req,res)=>{
    console.log(req.body);
dataService.getTranscation(req.body.acno).then(result=>{

    res.status(result.statusCode).json(result)
})


})
app.delete('/deleteAcc/:acno',(req,res) =>{
    dataService.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})



//setting port number for application(in 3000 series),and call back function to display message(it must be an arrow function)
app.listen(3000,()=>{
    console.log('server started at 3000');
})
