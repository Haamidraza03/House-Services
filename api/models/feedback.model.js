import mongoose, { Schema } from 'mongoose';

let fbSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    uname: {
        type: String,
        required: true,
    },
    serviceProvider: {
        type: Schema.Types.ObjectId,
        ref: 'Sp',
        required: true
    }
});

const Fb = mongoose.model('Feedback',fbSchema);

export default Fb;