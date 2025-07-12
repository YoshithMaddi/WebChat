import express from 'express'
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRouters.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from "socket.io";


const app = express();
const server= http.createServer(app)


//init socket.io serber
export const io =new Server(server,{
    cors:{origin:"*"}
})

//store online users
export const userSocketMap={}; // userid:socketId


//socket.io connecton handler
io.on("connection",()=>{
    const userId=socket.handshake.query.userId;
    console.log("User connected",userId);
    if(userId) userSocketMap[userId] =socket.id;
    // emit online users to all connected client
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
})


//middleware 
app.use(express.json({limit:"4mb"}));
app.use(cors())

app.use("/api/status",(req,res)=>res.send("<h1>Server is live</h1>"));
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);

// connect to mongo db
await connectDB();


const PORT= process.env.PORT|| 5000;
server.listen(PORT,()=>console.log("server is running on :"+PORT));
