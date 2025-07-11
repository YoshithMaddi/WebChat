import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()
  const [name, SetName] = useState("Yoshith")
  const [bio, Setbio] = useState("Hi hello")

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 p-10 flex-1'>
          <h3 className='text-lg'>Profile details</h3>

          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id='avatar'
              accept='.png, .jpeg, .jpg'
              className='hidden'
            />
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon}
              alt="Profile"
              className={`w-12 h-12 object-cover ${selectedImage && 'rounded-full'}`}
            />
            Upload profile image
          </label>

          <input
            onChange={(e) => SetName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder='Your name'
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          />

          <textarea
            onChange={(e) => Setbio(e.target.value)}
            value={bio}
            placeholder='Write profile bio'
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-[4rem]'
            rows={3} // changed to integer
          ></textarea>

          <button
            type='submit'
            className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'
          >
            Save
          </button>
        </form>
        <img src={assets.logo_icon} alt="Logo" className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10'/>
      </div>
    </div>
  )
}

export default ProfilePage
