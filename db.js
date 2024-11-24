const mongoose = require('mongoose');

const mongoURL='mongodb://localhost:27017/l1f22bsse0199';
mongoose.connect(mongoURL);

const db=mongoose.connection;

db.on('connected',()=>
{
    console.log('Mongoose connected to '+mongoURL);
})
db.on('disconnected',()=>{
    console.log('Mongoose disconnected from '+mongoURL);
})

db.on('error',()=>{
    console.log('Mongoose connection error: '+err);
})


module.exports =db;