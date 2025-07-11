import mongoose from "mongoose";

// func to connect to mongo db database
export const connectDB= async()=>{
    
    try {
        mongoose.connection.on('connected',()=> console.log('database has connected'))

        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    } catch (error) {
        console.log(error)
    }
}