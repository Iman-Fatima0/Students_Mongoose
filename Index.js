const express=require("express");
const app= express();

const db=require('./db');
const students=require('./Models/Record');
const port=8000;
const bodyparser=require('body-parser');

const Iman = require('./Models/Record');
app.use(bodyparser.json());

app.get('/getStudents', async (req, res) => {
  try {
    const response = await students.find(); 
    res.status(200).json(response); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});

app.post('/students', async (req, res) => {
  try {
    const postmandata = req.body;
    const newStudent = new Iman(postmandata);
    const response = await newStudent.save();

    console.log('Data Saved', response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Error saving student data" });
  }
});

app.get('/getStudents/active', async (req, res) => {
  try {
     const filter = { isActive: true};
    const course = req.query.course; 
    const year = req.query.year;    
    if (course) {
      filter.course = course; 
    }
    if (year) {
      filter.year = Number(year); 
    }
    const response = await students.find(filter);
    res.status(200).json(response);
  } catch (error) {
    console.error( error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/delete/students/:id',async(req,res)=>
{
   try{
     const id=req.params.id.trim();
     const response=await students.findByIdAndDelete({_id:id});
     res.status(200).json({"message":"Data deleted Successfully",response});
   }
   catch(error)
   {
     console.error(error);
     res.status(500).json({error: 'Internal Server Error'});
   }
})

app.put('/update/students/:id',async(req,res)=>
{
  const data=req.body;
  try{
    const id=req.params.id.trim();
    const response=await students.findByIdAndUpdate({_id:id},data,{new:true});
    res.status(200).json({"message":"Data updated Successfully",response});
  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})
app.listen(port,()=>
{
    console.log('listening on port',port);
})