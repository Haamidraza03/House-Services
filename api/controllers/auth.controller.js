import User from "../models/user.model.js";
import Sp from "../models/sp.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const spsignup = async (req, res, next)=>{
    const {uname,email,prof,phno,password} = req.body;
    if (phno.length!== 10) {
        return next(new Error("Phone number must be 10 digits long."));
      }
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newSp = new Sp({uname,email,prof,phno,password:hashedPassword});
    try{
        await newSp.save()
        res.status(201).json({message:"Service Provider created Successfully."});

    } catch(error){
        next(error);
    }
};

export const ulogin = async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials'));
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        const {password:hashedPassword, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now()+3600000);
        res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const splogin = async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        const validSp = await Sp.findOne({email});
        if(!validSp) return next(errorHandler(404,'User not found'));
        const validPassword = bcryptjs.compareSync(password,validSp.password);
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials'));
        const token = jwt.sign({id: validSp._id},process.env.JWT_SECRET);
        const {password:hashedPassword,...rest} = validSp._doc;
        const expiryDate = new Date(Date.now()+3600000);
        res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


export const google = async (req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
            const {password:hashedPassword, ...rest} = user._doc;
            const expiryDate = new Date(Date.now()+3600000);
            res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
        } else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8), 
                email:req.body.email, 
                password:hashedPassword, 
                profilePicture:req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:hashedPassword2,...rest} = newUser._doc;
            const expiryDate = new Date(Date.now()+3600000);
            res.cookie('access_token',token,{
                httpOnly:true,
                expires:expiryDate,
            }).status(200).json(rest);

        }
    } catch (error) {
        next(error);
    }
}


export const logout = (req,res)=>{
    res.clearCookie('access_token').status(200).json("You have Logged Out!");
}