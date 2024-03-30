import Sp from "../models/sp.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

// update sp

export const updateSp = async (req,res,next)=>{
    if (req.sp.id !==req.params.id){
        return next(errorHandler(401, "You can only update your Account!"));
    }
    try {
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }

        const updatedSp = await Sp.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    uname:req.body.uname,
                    email:req.body.email,
                    prof:req.body.prof,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                    description:req.body.description,
                    phno:req.body.phno,
                }
            },
            {new:true}
        );
        const {password,...rest} = updatedSp._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

//delete sp

export const deleteSp = async (req,res,next)=>{
    if(req.sp.id !== req.params.id){
        return next(errorHandler(401,'You can delete only your account!'));
    }
    try {
      await Sp.findByIdAndDelete(req.params.id);  
      res.status(200).json('Service Provider has been Deleted...');
    } catch (error) {
        next(error);
    }
}