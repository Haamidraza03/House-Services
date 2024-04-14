import mongoose from "mongoose";
import Sp from "../models/sp.model.js";
import Fb from "../models/feedback.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

// const {ObjectId} = mongoose.Types; //why this written if not implemented? This was giving //unnecessary objects in the console so i commented it.

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
                    price:req.body.price,
                    work:req.body.work, 
                    location:req.body.location,
                    pLoc:{
                        type: 'Point',
                        coordinates: [req.body.plong, req.body.plat]
                    }
                }
            },
            {new:true}
        );
        console.log(req.body)
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

//location sp
export const searchProviders = async (req, res) => {
    const { latitude, longitude, query } = req.query;
      
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required or search something' });
    }
      
    try {
        // query to find providers near the given coordinates
        const providers = await Sp.find({
        $or: [
            { uname: {$regex: query, $options: 'i'} },
            { prof: {$regex: query, $options: 'i'} },
            { description: {$regex: query, $options: 'i'} },
            { location: {$regex: query, $options: 'i'} },
        ],
        pLoc: {
            $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [parseFloat(longitude), parseFloat(latitude)]
                },
                $maxDistance: 50000 // Search radius in meters (adjust as needed)
            }
        }
        });   
        res.json(providers);
    } catch (error) {
        console.error('Error searching nearby providers:', error.message);
        res.status(500).json({ error: 'Error searching nearby providers' });
    }
}; 

// Provider profile details
export const getProviderById = async (req, res) => {
    const {providerId} = req.params;
    // console.log(providerId)
    try{
        // const providerId = mongoose.Types.ObjectId(pr);
        const provider = await Sp.findById(providerId);
        if(!provider) {
            return res.status(404).json({error: 'Provider not found'})
        }
        res.status(200).json(provider);
    } catch(error) {
        console.error('Error fetching provider details of :', error.message)
    }
}
    
// Add feedback
export const addFeedback = async (req, res) => {
    try {
        const { serviceProviderId } = req.params;
        const { text, rating, uname } = req.body;
    
        // Check if service provider exists
        const serviceProvider = await Sp.findById(serviceProviderId);
        if (!serviceProvider) {
          return res.status(404).json({ error: 'Service provider not found' });
        }
    
        // Create new feedback
        const newFeedback = new Fb({ text, rating, uname, serviceProvider: serviceProviderId });
        await newFeedback.save();
    
        // Add feedback reference to service provider
        Sp.feedbacks.push(newFeedback);
        await serviceProvider.save();
    
        res.status(201).json(newFeedback);
    } catch (error) {
        console.error('Error adding feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get feedbacks
export const getFeedbacksForSp = async (req, res) => {
    try {
        const { serviceProviderId } = req.params;
        const feedbacks = await Fb.find({ serviceProvider: serviceProviderId });
    
        res.json(feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
    