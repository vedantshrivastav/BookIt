import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL = process.env.MONGO_URL as string

export async function connectDB(){
    try{
        await mongoose.connect(MONGO_URL!)
        console.log('MONGO DB CONNECTED ')
    }
    catch(e){
        console.error("Error connecting to database",e)
    }
}
