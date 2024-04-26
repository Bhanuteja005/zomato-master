import express from 'express';

//database model
import { UserModel } from '../../database/allModels';

const router = express.Router();

/*
Route     /
des      get user data by id
params   _id
Access   Public
method   GET
*/

router.get("/:_id", async(req,res) => {
    try{
        const {_id} = req.params;
        const user = await UserModel.findById(_id);
        return res.json({user});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );

/*
Route     /update
des      update user data by id
params   _id
Access   Public
method   PUT
*/

router.put("/update/:_userId", async(req,res) => {
    try{
        const {_userId} = req.params;
        const {userData} = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(_userId, {
            $set: userData
        }, {new: true}) //return the new updated data 
        
        return res.json({user: updateUserData});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default router;