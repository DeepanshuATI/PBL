import mongoose from "mongoose";

export const DB = async () => {
    try {
        mongoose.set('strictQuery',false);
        await mongoose.connect(process.env.URL);
        console.log('DataBase connected ho gaya ballu');
    }
    catch(error){
        console.log('DB connection Error :',error);
    }
}