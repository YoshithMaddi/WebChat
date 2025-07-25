import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const {getUsers,users,selectedUser,setselectedUser,unseenMessages,setUnseenMessages}=useContext(ChatContext)
  const navigate=useNavigate();
  const [showMenu, setShowMenu] = useState(false); 
  const [input,setInput]=useState(false);

  const {logout,onlineUsers}=useContext(AuthContext)
  const filteredUsers=input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) :users;
//   const filteredUsers = (users || []).filter((user) =>
//   input ? user.fullName.toLowerCase().includes(input.toLowerCase()) : true
// );

  useEffect(()=>{
    getUsers();
  },[onlineUsers])
  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser? 'max-md:hidden':''}`}>
       <div className='pb-5'>
         <div className='flex items-center justify-between'>
            <img src={assets.logo} alt="logo" className='max-w-40' />
            {/* <p>Logo</p> */}
            <div className='relative py-2 group'>
                <img onClick={() => setShowMenu(!showMenu)} src={assets.menu_icon} alt="logo" className='max-h-5 cursor-pointer' />
                <div  className={`absolute top-full right-0 z-20 w-32 text-gray-100 ${showMenu? 'block':'hidden' }`}>
                    <p onClick={()=>{
                      navigate('/profile');
                      setShowMenu(false);
                      }} className='cursor-pointer text-sm'>Edit profile</p>
                    <hr className='my-2 border-t border-gray-500'/>
                    <p onClick={()=>{logout()}} className='cursor-pointer text-sm'>logout</p>
                </div>
            </div>  
         </div>
         <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5' >
            <img src={assets.search_icon} alt="search" className='w-3' />
            <input onChange={(e)=>setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search..'/>
         </div>

        </div>
        {/* chatsshow  */}
        <div> 
            {filteredUsers.map((user, index) =>(
              <div key={index}
              onClick={()=>{setselectedUser(user)}}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id===user._id && 'bg-[#282142]/50'} `}>
                <img src={user?.profilePic || assets.avatar_icon} alt="UserProfile image" className='rounded-full w-[35px] aspect-[1/1] '/>
                <div className='flex flex-col leading-5'>
                  <p>{user.fullName}</p>
                  {
                    onlineUsers.includes(user._id)? <span className='text-green-400 text-xs'>Online</span>:
                    <span className='text-neutral-400 text-xs'>offline</span>
                  }
                </div>{unseenMessages[user._id]>0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>}
              </div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar;
