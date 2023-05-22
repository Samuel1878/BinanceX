const {Schema, model} = require("mongoose");
const mongoose = require("mongoose")
const Register = new Schema({
    email:{
        type:String},
    phone:{
        type:Number},
    password:{
        type:String,required:false},
    name:{
        type:String},
    role:{
        type:String}
},{timestamps:true});
//Register.index({"$**" : "text"})
const User = mongoose.model("User", Register);
module.exports = User; 
