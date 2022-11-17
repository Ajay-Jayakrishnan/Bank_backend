
//database
//json webtoken import
//sign method is used to generate token using json webtoken
// middle wares method is used to proce
//import cors for binding servers from different port numbers
const db = require('./db')
const jwt =require('jsonwebtoken')
const { application } = require('express')
dataBase = {

    1000:{acno:1000,name:"ajay",password:1000,balance:2000,transaction:[]},
    1001:{acno:1001,name:"basil",password:1001,balance:4000,transaction:[]},
    1002:{acno:1002,name:"christo",password:1002,balance:4000,transaction:[]}
}


//register
const register = (usename,acno,password)=>{
   return db.User.findOne({
    acno
   }).then(result=>{

    if(result)

   { return{
      statusCode:404,
      message:"User already exist.Please Login",
      status:false
    }}
    
    else{
 newUser = new db.User({
        acno,
        usename,
        password,
        balance : 0,
        transaction:[]
      })
        }

     newUser.save()
        return {
          statusCode:200,
          status:true,
          message:"Successfully registered"
        }
   })
        
    
    }
    
      
  
  const login = (acno,pswd) => {
   
    return db.User.findOne({
      acno,
      password:pswd
    }).then(result=>{
      if(result){
        currentUser = result.usename
        currentAcno = acno;
        const token = jwt.sign({
          currentAcno:acno
        },'supersecretkey')
        return {
          statusCode:200,
        status:true,
        message:"Login Successfull",
        token, 
        currentUser,
        currentAcno

        }
      }
      else{
        return {
          statusCode:404,
        status:false,
        message:"Incorrect Username or  Password"
        }
      }
    })
    
  
    
  }
 const deposit = (acno,pswd,amt) => {
  const amount =parseInt(amt)
    return db.User.findOne({
      acno,
      password:pswd
    }).then(result=>{
     if(result)
      {
        result.balance += amount
      result.transaction.push({
        type:'Credit',
        amount
      })
      result.save()
      return{
        statusCode:200,
        status:true,
        message:`${amount} deposited successfully and new balance is ${result.balance}`
      }
    }
    
      else{
        return {
          statusCode:404,
          status:false,
          message:"incorrect password or Username"
        }
      }
    })
   
  }
 const withdraw = (acno,pswd,amt) => {
  const amount = parseInt(amt)
  return db.User.findOne({
    acno,
    password:pswd
  }).then(result=>{
    if(result){
      if(result.balance > amount){
        result.balance-=amount
        result.transaction.push({
          type:'Debit',
            amount
        })
        result.save()
        return {
          statusCode:200,
          status:true,
          message:`${amount} withdrawn succesfully and new balance is ${result.balance}`
        } 
       
      }
      else{
        return{
          statusCode:404,
          status:false,
          message:"insufficient balance"
        }
      }
     
    }
     else{
      return{
        statusCode:404,
        status:false,
        message:"incorrect password  or account number"
      }
    
    }
    
  }
  )
     }
 const getTranscation = (acno) => {
  return db.User.findOne({
    acno
  }).then(result=>{
    if(result){
      return{
        statusCode:200,
        status:true,
        transaction:result.transaction
    }
  }
  else{
    return{
      statusCode:404,
      status:false,
      message:"user does not exist"
    }
  }

})

 }


 const deleteAcc = (acno) => {
  return db.User.deleteOne({
    acno
  }).then(result=>{
    if (result)
    {return{
        statusCode:200,
        status:true,
        message:`Account ${acno} deleted`
    }}

    else {
      return {
           statusCode:404,
           status:false,
           message:`Account ${acno} doesnt exist`}
     }
  }

  )
 }
  
  
  module.exports = {
    register,login,deposit,withdraw,getTranscation,deleteAcc,
   }