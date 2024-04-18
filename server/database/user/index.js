import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
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

userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "ZomboAppbhanu");
};

userSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  // check whether email exists
  const checkUserByEmail = await User.findOne({ email });
  // check whether phone number exists
  const checkUserByPhone = await User.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User already exists!");
  }

  return false;
};
userSchema.pre("save", function(next) {
  const user = this;

  // password is modified
  if (!user.isModified("password")) return next();

  // generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // assign hashed password
      user.password = hash;
      return next();
    });
  });
});

export const User = mongoose.model("User", userSchema);