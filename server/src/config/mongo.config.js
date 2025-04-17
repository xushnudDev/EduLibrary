import { config } from "dotenv";
import mongoose from "mongoose";

config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB✅");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
};
export default connectDB;