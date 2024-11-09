const express = require('express');
const User=require('../models/user.model');
const jwt = require('jsonwebtoken');
const  bcrypt =require('bcryptjs');

const router = express.Router();



router.get('/',async (req,res)=>{
    const users = await User.find({});
    res.send(users);
})

router.post('/createUser',async(req,res)=>{
    const {firstname,lastname,email , password } = req.body;
        console.log("request is ",req.body);
        try {
                if( email && password)
                {
                    const isUser = await User.findOne({email: email});
                    if(!isUser){
                        // password hashing
                        const genSalt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password,genSalt);
                        // save a user
                        console.log(hashedPassword);
                        const newUser = new User({
                            email,
                            password: hashedPassword,
                            firstname,
                            lastname,
                        
                        });
                        const savedUser = await newUser.save();
                        if(savedUser)
                        {
                            return res.status(200).json({ message: "User registration successfully"});
                        }
                    }
                    else {
                        return res.status(400).json({ message: "email already registerd"});
                    }
                }
                else{
                    return res.status(400).json({ message: "all fields are Required"});
                }
        }
        catch (error){
            return res.status(400).json({ message: error.message});
        }
})

router.post('/login',async(req,res)=>{
    console.log("request came",req.body);
    const { email , password } = req.body;

       try{
            if(email && password)
            {
                const isEmail = await User.findOne({email : email});
                if(isEmail){
                    if(isEmail.email=== email && (await bcrypt.compare(password,isEmail.password)) ){
                        // generate Token
                        const token = jwt.sign({userID : isEmail._id},"Secreat key",{ expiresIn:"2d",});
                        return res.status(200).json({
                            message: "Login Successfully",
                            token,
                            name : isEmail.username,
                        });
                    }
                    else{
                        return res.status(400).json({ message: "Wrong Credentials"});
                    }
                }
                else{
                    return res.status(400).json({ message: "Email ID not found"});
                }
            }
            else{
                return res.status(400).json({ message: "all fields are required"});
            }
       }
       catch (error){
        return res.status(400).json({ message: error.message});
    }
    }
)

module.exports= router;
