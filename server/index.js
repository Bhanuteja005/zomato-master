//env variable
require('dotenv').config();

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

//API
import Auth from './API/Auth';

//Database connection   
import ConnectDB from './database/connection';

const zomato=express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(helmet());
zomato.use(cors());

//For application routes
//localhost:4000/auth/signup
zomato.use('/auth',Auth);

zomato.get('/',(req,res)=> res.json({message:'Hello Bhanu setup complete Yay!'}));

zomato.listen(4000,()=>
ConnectDB().then(()=>console.log("Server is running on port 4000"))
.catch(()=>console.log("DB connection failed")));
