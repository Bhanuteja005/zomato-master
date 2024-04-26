import { RestaurantModel } from "../../database/allModels";

import { ValidateRestaurantId } from "../../validation/food";
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant";

import express from "express";

const Router = express.Router();

/*
Route     /
des      get all Restaurants details
params   none
Access   Public
method   GET
*/


Router.get("/", async(req,res) => {
    try{
        await ValidateRestaurantCity(req.query);
        const {city} = req.query;//query is like accessing something if we search something netflix in link it will show ?veQDGJG SOME number will come this is query
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );

/*
Route     /
des      get particular Restaurants details on id
params   _id
Access   Public
method   GET
*/

Router.get("/:_id", async(req,res) => {
    const {_id} = req.params;
    try{
        await ValidateRestaurantId(req.params);
        const restaurant = await RestaurantModel.findById(_id);
        if(!restaurant) throw new Error("Restaurant not found");
        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});


/*
Route     /
des      get Restaurants details search
params   none
body     searchstring
Access   Public
method   GET
*/

Router.get("/search", async(req,res) => {
    await ValidateRestaurantSearchString(req.body);
    const {searchstring}= req.body;
    if (!searchstring) {
        return res.status(400).json({error: "search string is required"});
    } 
    let regex = new RegExp(searchstring, "i"); // case insensitive  //i is for case insensitive
    try{
        const restaurants = await RestaurantModel.find({
            name: regex,
        });
        if(!restaurants) throw new Error("Restaurant not found");
        return res.json({restaurants});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});


export default Router;