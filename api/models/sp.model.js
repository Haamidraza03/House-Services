import mongoose from 'mongoose';

const spSchema = new mongoose.Schema({
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
},{timestamps: true});


const Sp = mongoose.model('Service-Provider',spSchema);


export default Sp;