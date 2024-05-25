const mongoose= require("mongoose");

//create schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    Todo:{
        type:String,
        required:true,

    },
},
{timestamps:true});

//create Model
const User=mongoose.model("Userdata", userSchema)
module.exports = User;