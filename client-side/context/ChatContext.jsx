import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";



export const ChatContext=createContext();

export const ChatProvider=({children})=>{
    const [messages,setMessages]=useState([]);
    const [users,SetUsers]=useState([]);
    const [selectedUser,setSelectedUser]=useState(null)
    const [unseenMessages,setUnseenMessages]=useState({})

    const {socket,axios}=useContext(AuthContext);
    //func to get contacts bar left side
    const getUsers=async()=>{
        try {
            const{data}=await axios.get("/api/messages/users");
            if(data.success){
                SetUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    //func ot mess for user (1)
    const getMessages=async(userId)=>{
        try {
            const {data} = await axios.get(`/api/messages/${userId}`)
            if(data.success) {
                SetMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)            
        }
    }
    // fun to send mess to 1 user 
    const sendMessage=async(messageData)=>{

        if(!selectedUser || !selectedUser._id) {
            toast.error("no user selected to send msg")
            return ;
        }
        try {
            const {data }=await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
            if(data.success){
                setMessages((prevMessages)=>[...prevMessages,data.newMessage])
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)   
        }
    }

    // fun to sub to message for selected user
    const subscribeToMessages=async()=>{
        if(!socket) return ;
        socket.on("newMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen=true ;
                setMessages((prevMessages)=>[...prevMessages,newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }
            else{
                setUnseenMessages((prevUnseenMessages)=>({
                    ...prevUnseenMessages,[newMessage.senderId]:prevUnseenMessages[newMessage.senderId] ?prevUnseenMessages[newMessage.senderId]+1:1
                }))
            }
        })
    }
    // func to unsubscrieb from mesg ;
    const unsubscribeFromMessages=()=>{
        if(socket) socket.off("newMessage");
    }
    useEffect(()=>{
        subscribeToMessages();
        return ()=> unsubscribeFromMessages();
    },[socket,selectedUser])

    const value={
        messages,users,selectedUser,getUsers,setMessages,sendMessage,setSelectedUser,unseenMessages,setUnseenMessages
    }
    return (
    <ChatContext.Provider value={value}>
        {children}

    </ChatContext.Provider>
    )
}