import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const PORT=8080;
const app=express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended:false}));


import cors from 'cors'
import { Timestamp } from "bson";
const corsOptions={
    origin:"http://localhost:3000"
}


app.use(cors(corsOptions));
mongoose.connect('mongodb://127.0.0.1:27017/ReactJs').then((res)=>{
    console.log("mongodb connected")
}).catch((err)=>{
    console.log(err)
})

const userSchema= new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }},
    {
        timestamps:true
    })

const User=mongoose.model('User',userSchema);
console.log(User);
app.post('/register',(req,res)=>{
    console.log(req.body);
    const user=new User({
        username:req.body.input.username,
        email:req.body.input.email,
        password:req.body.input.password,
    })

     user.save()
    console.log(user)
    
})

app.get('/register',(req,res)=>{
    res.send("Hello your in register page")
})
app.listen(PORT,function(){
    console.log(`Server running at Server running at http://127.0.0.1:${PORT}/`)
})