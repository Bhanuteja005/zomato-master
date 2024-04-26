//env variable
require('dotenv').config();

import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

//config
import googleAuthConfig from './config/google.config';
import routeConfig from './config/route.config';

//API
import Auth from './API/Auth';
import Food from './API/Food';
import Image from './API/Image';
import Menu from './API/Menu';
import Order from './API/Orders';
import Restaurant from './API/Restaurant';
import Review from './API/Reviews';


//Database connection   
import ConnectDB from './database/connection';

const zomato=express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//For application routes
//localhost:4000/auth/signup
zomato.use('/auth',Auth);
zomato.use('/restaurant',Restaurant);
zomato.use('/food',Food);
zomato.use('/menu',Menu);
zomato.use('/image',Image);
zomato.use('/order',Order);
zomato.use('/review',Review);


zomato.get('/',(req,res)=> res.json({message:'Hello Bhanu setup complete Yay!'}));

zomato.listen(4000,()=>
ConnectDB().then(()=>console.log("Server is running on port 4000"))
.catch(()=>console.log("DB connection failed")));