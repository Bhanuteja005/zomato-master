import bcryptjs from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
const Router = express.Router();

//Models
import { UserModel } from '../../database/user';


/*
Route      /signup
Des        Signup with email and password
Params     none
Access     Public
Method     POST
*/

Router.post("/signup", async (req, res) => {
    try{
        const { email, password, fullname, phoneNumber } = req.body.credentials;

        // check whether email exists or phone number exists
        const checkUserByEmail = await UserModel.findOne({email: email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber: phoneNumber});
        if(checkUserByEmail || checkUserByPhone){
            return res.json({error: "User already exists!"});
        }
        // Hashing and Salting
        const bcryptSalt = await bcryptjs.genSalt(8); 
        const hashedPassword = await bcryptjs.hash(password, bcryptSalt);
        // DB
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword,
        });


        //JWT Auth Token
        const token = jwt.sign({user: {fullname, email}},"ZomatoAppBhanu" );

        return res.status(200).json({token, status: "Success"});

    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;