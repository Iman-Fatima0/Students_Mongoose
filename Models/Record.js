const mongoose=require('mongoose');
const {type}=require('os');

const students=new mongoose.Schema({

    studentID :{type:Number, required:true}, 
     name:{type:String, required:true}, 
    email:{type:String, required:true, unique:true}, 
    course:{type:String, required:true}, 
    year:{type:Number, required:true}, 
    gpa:{type:Number, required:true, min: 0, max: 4.0}, 
    isActive:{type:Boolean, default: true},
    enrollmentDate:{type:Date, required:true}, 
    graduationDate:{type:Date}
},{'collection':'Iman'});

const Iman =mongoose.model('Iman',students);
module.exports=Iman;