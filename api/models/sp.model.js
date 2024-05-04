import mongoose, { Schema } from 'mongoose';
import Fb from "../models/feedback.model.js";

let spSchema = new mongoose.Schema({
    uname:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    prof:{
        type: String,
        required: true,
    },
    phno:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
    },
    description:{
        type: String,
        default:"lorem ipsum dolor sit amet, consectetur adipiscing elit esse cillum dolore magna aliquet lore m nibh. Cum sociis natoque penatibus et justo euismod tempor inc habitant dolore magna",
    },
    price:{
        type: String,
        default:"0",
    },
    work:{
        type: String,
        default:"Part Time",
    },
    location:{
        type: String,
    },
    pLoc: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0,0]
        }
    },
    feedbacks: [{
        type: Schema.Types.ObjectId,
        ref: 'Fb'
    }],
    averageRating:{
        type: Number,
        default:"0",
    },
},{timestamps: true});
spSchema.index({ pLoc: '2dsphere' });


const Sp = mongoose.model('Service-Provider',spSchema);


export default Sp;