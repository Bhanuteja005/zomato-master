import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  address:[{detail:{type:String},for:{type:String}}],
    phoneNumber: [{type: Number}]
},{
  timestamps:true

});

export const User = mongoose.model("User", userSchema);