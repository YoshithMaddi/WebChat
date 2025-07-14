import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chatcontainer from '../components/Chatcontainer'
import RightSideBar from '../components/RightSideBar'

const HomePage = () => {
  const [selectedUser, setselectedUser] = useState(false)

  return (

    <div className='border w-full h-screen sm:px-[5%] sm:py-[1%]'>
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser?'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}`}>
        <Sidebar/>
        <Chatcontainer selectedUser={selectedUser} setselectedUser={setselectedUser}/>
        <RightSideBar selectedUser={selectedUser} setselectedUser={setselectedUser}/>
      </div>

    </div>
  )
}

export default HomePage
