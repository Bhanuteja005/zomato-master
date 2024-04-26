require('dotenv').config();

// Libraries
import AWS from 'aws-sdk';
import express from 'express';
import multer from 'multer';

const app = express();

//Database model

const Router = express.Router();

//utilities
import { s3Upload } from '../../Utilis/AWS/s3';

//multer config
const storage = multer.memoryStorage();
const upload = multer({storage})// Log the environment variables

//AWS S3 bucket config
const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1"
});



/*
Route     /
des     Uploading given image to s3 bucket, and then saving the file to mongodb database
params   none    
Access   Public
Method    GET
*/

Router.post("/", upload.single("file"), async(req,res) => {
    try{
        const file = req.file;
        //s3 bucket options
        const bucketOptions = {
            Bucket: "zomatobhanu",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        

        const uploadImage = await s3Upload(bucketOptions);
        res.status(200).json({uploadImage});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});



export default Router; 