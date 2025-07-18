import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState,setCurrState]=useState("Signup")
  const [fullName,setFullName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("") 
  const [bio,setBio]=useState("")
  const [isDatasubmitted,setIsDataSubmitted]=useState(false)

  const {login} = useContext(AuthContext)

  const onSubmitHandler=(event)=>{
    event.preventDefault();
    if(currState === 'Signup' && !isDatasubmitted){
      setIsDataSubmitted(true)
      return ;
    }

    
    login(currState==="Signup" ?'signup':'login',{fullName,email,password,bio});    

  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'> 
      {/* left side */}
      {/* <img src={assets.logo_big} alt=""  className='w-[min(30vw),250px]'/> */}
      {/* right side */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>{currState}
          {isDatasubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
          
        </h2>
        {currState==='Signup' && !isDatasubmitted &&(<input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Name' required/>)}
        {!isDatasubmitted && (
          <>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
            
          </>
        )}
        {
          currState==='Signup' && isDatasubmitted && (
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Drop a mini bio here ....' required></textarea>
          )
        }
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState==="Signup" ? "Create Account" :"Login Now"}
        </button>
        {/* sodhi */}
          {/* <div className='flex items-center gap-2 text-0.5xl text-gray-50'> 
          <input type="checkbox"/>
          <p>read all rules u pig</p>
        </div>  */}
        <div className='flex flex-col gap-2'>
          {currState==="Signup" ? (
            <p>have an account?<span className='font-medium text-violet-500 cursor-pointer' onClick={()=>{setCurrState("Login")}}>login here</span></p> 
            
          ) : (
            <p className='text-sm text-gray-600'>create an account <span className='font-medium text-violet-500 cursor-pointer' onClick={()=>setCurrState("Signup")} >click here</span> </p>
          )}

        </div>
      </form>
    </div>
  )
}
export default LoginPage
