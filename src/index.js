 //require('dotenv').config({path: './.env'});
 import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import connectDB from "./db/index.js"

dotenv.config({path: './.env'});
connectDB()
.then (() => {
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })      
})
.catch((err) => {
    console.error("Error in DB connection", err);
    
})













/*
import express from "express";

const app=express();

/*( async() => {
    try{
        await mongooose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("Error in DB connection", error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }catch(error){
        console.error("Error in DB connection", error);
    }
})()
*/