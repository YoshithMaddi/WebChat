import React from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const Sidebar = ({selectedUser,setselectedUser}) => {
    const navigate=useNavigate();
  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser? 'max-md:hidden':''}`}>
       <div className='pb-5'>
         <div className='flex items-center justify-between'>
            <img src={assets.logo} alt="logo" className='max-w-40' />
            {/* <p>Logo</p> */}
            <div className='relative py-2 group'>
                <img src={assets.menu_icon} alt="logo" className='max-h-5 cursor-pointer' />
                <div className='absolute top-full right-0 z-20 w-32 text-gray-100 hidden group-hover:block'>
                    <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit profile</p>
                    <hr className='my-2 border-t border-gray-500'/>
                    <p className='cursor-pointer text-sm'>logout</p>
                </div>
            </div>
            
         </div>
         <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5' >
            <img src={assets.search_icon} alt="search" className='w-3' />
            <input type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search..'/>
         </div>


        </div> 
    </div>
  )
}

export default Sidebar;
