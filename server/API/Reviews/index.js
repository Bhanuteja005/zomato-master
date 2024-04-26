import express from 'express';

//database model
import { ReviewModel } from '../../database/allModels';

const Router = express.Router();

/*
Route     /new
des      add new review
params   none
body      review object
Access   Public
Method    Post
*/

Router.post("/new", async(req,res) => {
    try{
        const {reviewData} = req.body;
        await ReviewModel.create(reviewData);
        return res.json({review: "Successfully created review"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route     /delete
des      delete new review
params   _id
Access   Public
Method    delete
*/
Router.delete('/delete/:_id', async(req,res) => {
    try{
        const {_id} = req.params;
        await ReviewModel.findByIdAndDelete(_id);
        return res.json({review: "Successfully deleted the review"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;