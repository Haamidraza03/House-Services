import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const usignup = async(req,res,next)=>{
    const {uname,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({uname,email,password:hashedPassword});
    try{
        await newUser.save()
        res.status(201).json({message:"User created Successfully."});

    } catch(error){
        next(error);
    }
    
};