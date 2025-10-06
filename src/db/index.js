import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        const connectioninstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`\n mongoDB connected !! DB HOST : ${connectioninstance.connection.host}`);
    }
    catch(error){
        console.error("connection error in mongo", error);
        process.exit(1);
    }
}

export default connectDB