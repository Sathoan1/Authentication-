require('dotenv').config()
const express = require('express');
const app= express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/authRoutes')

// middleware
app.use(express.json())

// routes
app.use('/api', authRouter)
// error route
app.use((req,res)=> {
    res.status(404).json({message: 'Resource not found'})
})

// dbconnection
const start = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`server running on port : ${PORT}`);
        })
    }catch (error){
        console.log(error);
    }
}
start();