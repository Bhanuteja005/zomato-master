import express from 'express';
const Router = express.Router();

//Models
import { User } from '../../database/user';


/*
Route      /signup
Des        Signup with email and password
Params     none
Access     Public
Method     POST
*/

Router.post("/signup", async (req, res) => {
    try{
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

export default Router;