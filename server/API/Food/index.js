import express from 'express';

//Database model    
import { FoodModel } from '../../database/allModels';


//validation
import { ValidateCategory, ValidateRestaurantId } from '../../validation/food';


const router = express.Router();

/*
Route     /
des      get all food based on particular restaurant
params   _id
Access   Public
method   GET
*/

router.get("/:_id", async(req,res) => {
    try{

        await ValidateRestaurantId(req.params);

        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant: _id});
        return res.json({foods});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );

/*
Route     /r
des      get all food based on particular category
params   category
Access   Public
method   GET
*/
router.get('/r/:category',async(req,res) => {
    try{
        await ValidateCategory(req.params);
        const {category} = req.params;
        const foods = await FoodModel.find({category:{$regex: category, $options: "i"} });  //$regex is for regular expression and $options is for case insensitive
        if(!foods) return res.status(404).json({error: `No food found for ${category}`});
        else  return res.json({foods});
        
    } catch (err) {
        return res.status(500).json({error: error.message});
    }
});


/*
Route     /addFoodToRestaurant
des      add a new dish to the restaurant's menu 
params   token (from auth middleware), id (_id of the restaurant), name, price, description, category
Access   Private
Method   POST


router.post('/addFoodToRestaurant', passport.authenticate('jwt'), async(req,res) => {
    try{
        const {foodData} = req.body;
        await FoodModel.create(foodData);
        return res.json({message: "Successfully created dish"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
} );

*/
export default router;