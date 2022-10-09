const { Todo} = require('../models/todo')
const express = require('express')
const Joi  = require("joi")

const router = express.Router()

router.post("/", async (req,res)=>{
try{
    const schema = Joi.object({
      task: Joi.string().min(3).max(300).required(),
      isComplete: Joi.boolean(),
      date: Joi.date(),
    });
    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const { task, author, isComplete, date, uid } = req.body;

    let todo = new Todo({ task, author, isComplete, date, uid });

    todo =await todo.save()
    res.send(todo)
}catch(error){
    res.status(500).send(error.message)
    console.log(error.message)
}
})

router.get("/", async (req, res)=>{
    try{
    const todos =await Todo.find()
        res.send(todos)
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)
    }
})

router.delete('/:id' , async (req, res)=>{
    try{
        const todos =await Todo.findById(req.params.id)
    if(!todos) return res.status(404).send('no data found!!!')
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        res.send(deleteTodo)
    }catch(error){
        res.status(500).send(error.message)
        console.log(error.message)
    }
})

router.put('/:id', async (req,res)=>{
    const schema = Joi.object({
    task: Joi.string().min(3).max(300).required(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    try{
    const todo =await Todo.findById(req.params.id)
    if(!todo) return res.status(404).send('no data found!!!')
     const { task, author, isComplete, date, uid } = req.body;
        const updatedTodo =await Todo.findByIdAndUpdate(req.params.id  , {
        task,
        isComplete,
        date,
    }, {new: true})
    res.send(updatedTodo)
    }catch(error){
        res.status(500).send(error.message)
    }
})
    router.patch('/:id', async (req,res)=>{
        try{
            const todo =await Todo.findById(req.params.id)
    if(!todo) return res.status(404).send('no data found!!!')
        const updatePatchData = await Todo.findByIdAndUpdate(req.params.id , { isComplete : !todo.isComplete})
    res.send(updatePatchData)
    }catch(error){
        res.status(500).send(error.message)
    }
})

module.exports = router;