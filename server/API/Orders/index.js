import express from 'express';
import passport from 'passport';
//database model
import { OrderModel } from '../../database/allModels';

const Router = express.Router();

/*
Route     /
des      get all orders based on id
params   _id
Access   Public
Method    GET
*/

Router.get("/:_id", passport.authenticate("jwt",{session:false}), async(req,res) => {
    try{
        const {_id} = req.params;
        const orders = await OrderModel.findOne({user: _id});
        if(!orders) return res.status(404).json({error: "User not found"});
        return res.json({orders});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );

/* 
Route     /new
des      add new order
params   _id
Access   Public
Method    POST
*/

Router.post("/new/:_id", async(req,res) => {
    try{
        const {_id} = req.params;
        const {orderDetails} = req.body;
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id
            },
            {
                $push: {orderDetails}
            },
            {new: true}
        );
        return res.json({order: addNewOrder});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});


export default Router;