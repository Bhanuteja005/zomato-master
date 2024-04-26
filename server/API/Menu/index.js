//libraries

import express from 'express';

//database model
import { ImageModel, MenuModel } from '../../database/allModels';

const Router = express.Router();

/*
Route     /list
des      get all menu based on particular restaurant
params   _id
Access   Public
Method    GET
*/

Router.get("/list/:_id", async(req,res) => {
    try{
        const {_id} = req.params;
        const menus = await MenuModel.findOne({restaurant: _id});
        return res.json({menus});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );

/*
Route     /image
des      get all menu images based on id
params   _id
Access   Public
Method    GET
*/

Router.get("/image/:_id", async(req,res) => {
    try{
        const {_id} = req.params;
        const menus = await ImageModel.findOne({menu: _id});
        return res.json({menus});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );

export default Router;