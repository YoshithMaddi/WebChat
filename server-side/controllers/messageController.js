import Message from "../models/Messages.js";
import User from "../models/User.js";

//get all users except the logged in user 
export const getUserForSidebar=async(req,res)=>{
    try {
        const userId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:userId}}).select("-password");

        // cnt number of messages not seen
        const unseenMessages={}
        const promises=filteredUsers.map(async(user)=>{
            const messages=await Message.find({senderId:user._id,receiverId:userId,seen:false})
            if (messages.length > 0){
                unseenMessages[user._id]=messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success:true,filteredUsers,unseenMessages})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


//get all msg for selected user 

export const getMessages=async(req,res)=>{
    try {
        const {id:selectedUserId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:selectedUserId},
                {senderId:selectedUserId,receiverId:myId},
            ]
        })
        await Message.updateMany({senderId:selectedUserId,receiverId:myId
        },{seen:true});
        res.json({success:true,messages})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

// api to mark message as seen
export const markMessageAsSeen=async(req,res)=>{
    try {
        const {id} =req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success:true})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

// send msg to selcted userr
export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const receiverId=req.params.id;
        const senderId= req.user._id ;
                
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}