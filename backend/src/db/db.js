import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

 const db = async () => {
    try {
        mongoose.set('strictQuery',false);
       const connectionInstance =  await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`DataBase connected ho gaya ballu !! DB host : ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log('DB connection Error :',error);
        process.exit(1)
    }
}

export default db;