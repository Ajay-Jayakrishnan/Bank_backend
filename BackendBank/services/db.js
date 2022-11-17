 //mongoose is a library used to connect mongodb  to express port
 const  mongoose = require('mongoose')
 //connecting server with db
 mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('Mongo Db Connected');
 })
 //create a model /collection  .firstt letter capital and singular   tis will become small letter in mongo and plural
 const User = mongoose.model('User', {
    acno:Number,
    usename:String,
    password:String,
    balance:Number,
    transaction:[]
 })
 //export 
module.exports={
    User
}