import mongoose from "mongoose";

 const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI,)
 
       console.log(`MongoDB Connected: ${conn.connection.host}`);
         return conn;
    } catch (error) {
         console.error(`Error While Connecting to DB: ${error.message}`);
         process.exit(1); // Exit the process with failure
    }
 }
export default connectDB;