import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODBURL}`);
        console.log(`MongoDB is connected! DB Host: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("ERROR: ", error);
        throw error
    }
};

export default connectDB;