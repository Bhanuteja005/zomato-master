import express from 'express';
import passport from 'passport';
const Router = express.Router();

//Models
import { User } from '../../database/user';



//Validation

import { ValidateSignin, ValidateSignup } from '../../validation/auth';



/*
Route      /signup
Des        Signup with email and password
Params     none
Access     Public
Method     POST
*/
Router.post("/signup", async (req, res) => {
    try{
        const { error } = ValidateSignup(req.body.credentials); //Validating the user input data
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email,  phoneNumber } = req.body.credentials;
        await User.findByEmailAndPhone( req.body.credentials );
        // DB
        const newUser = await User.create(req.body.credentials);
        //JWT Auth Token
        const token = newUser.generateJwtToken();
        return res.status(200).json({token, status: "Success"});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

Router.post("/signin", async (req, res) => {
    try{
        const { error } = ValidateSignin(req.body.credentials); //Validating the user input data
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await User.findByEmailAndPassword( req.body.credentials );
        
        //JWT Auth Token
        const token = user.generateJwtToken();
        return res.status(200).json({token, status: "Success"});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route      /signin
Des        Signin with email and password
Params     none
Access     Public
Method     POST


Router.post("/signin", async (req, res) => {
    try{

        await ValidateSignin(req.body.credentials); //Validating the user input data

        const user = await User.findByEmailAndPassword( req.body.credentials );
        
        //JWT Auth Token
        const token = user.generateJwtToken();
        return res.status(200).json({token, status: "Success"});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
});*/
/*
Route      /google
Des        google signin
Params     none
Access     Public
Method     get
*/

Router.get("/google", passport.authenticate("google",{
    scope:[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
}));

/*
Route      /google/callback
Des        google signin callback
Params     none
Access     Public
Method     get
*/

Router.get("/google/callback", passport.authenticate("google",{failureRedirect:"/"}),(req,res)=>{
    return res.json({token:req.session.passport.user.token});
});
export default Router;