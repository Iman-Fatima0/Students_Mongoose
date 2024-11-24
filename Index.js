const express=require('express');
const app= express();

const db=require('./db');
const students=require('./Models/Record');
const port=8000;
const bodyparser=require('body-parser');
const { console } = require('inspector');
const Iman = require('./Models/Record');
app.use(bodyparser.json());
app.use(express.json());

app.post('/students', async (req, res) => {
  try {
    const postmandata = req.body;
    const newStudent = new Iman(postmandata);
    const response = await newStudent.save();

    console.log('Data Saved', response);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Error saving student data" });
  }
});

app.listen(port,()=>
{
    console.log('listening on port',port);
})