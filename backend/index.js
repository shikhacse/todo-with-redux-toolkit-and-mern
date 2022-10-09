const todos = require('./routes/todos')
const express = require("express");
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()


app.get('/', (req, res)=>{
    res.send("welcome to our todos api")
})
app.use(cors())
app.use(express.json())
app.use('/api/todos', todos)
const connection_string = process.env.CONNECTION_STRING
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('server running on port' , port)
})

mongoose.connect(connection_string).then(()=>{
    console.log('mongodb connected successfully!')
}).catch((error)=>{
    console.log('mongodb connection failed' , error.message)
})