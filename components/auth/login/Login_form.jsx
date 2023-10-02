'use client';
import React from 'react'
import style from '@/styles/login.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export const metadata = {
  title: 'Login',
  description: 'Create by NICE',
}
const initialUserData = {
  username: "",
  password: "",
}
export default function Login_form() {
  
  const router = useRouter();
  const [userdata,setUserdata] = useState(initialUserData);
  const [riseError, setError] = useState("");
  
  const handleChange = (e) =>{
    const { id,value } = e.target
    setUserdata((prevData) => ({...prevData,[ id ]:value}))
  }
  const register_redirect = () =>{
    router.push("/auth/register");
    
  }
  const handle_login_submit = async (e) =>{
    e.preventDefault();
    setError("")
    try{
      const res = await signIn('credentials',{
        ...userdata,
        redirect:false
      });
      
      if(res.status === 201){
        console.log("connect login")
        router.push("/");
      }

      if(res?.error){
        setError(error);
        console.log("something went wrong",res.error);
        switch(res?.error){
          case "Username or Password Doesn't match":
            console.log("Username or Password Doesn't match");    
            console.log(res.error);       
            break;
          default:
            console.log(res.error);
        }
        }else{
          router.push("/");
      }
      
    }catch(error){
      // console.log(error)
    }
  }
  
  
  return (
  <>
    <div className={style.container}>
      <label >Login</label>
            <form onSubmit={handle_login_submit} className={style.form_login}>
            <div>
            <input type='text' id='username' value={userdata.email} onChange={handleChange} className={style.input_bar} placeholder={'Username'}/>
            </div>
            <div>
            <input type='password' id='password' value={userdata.password} onChange={handleChange} className={style.input_bar} placeholder='Password'/>
            </div>
            <div className={style.alighment}>
            <button type='submit' className={style.submit_btn}>Login</button>
            <button type='button' className={style.submit_btn} onClick={register_redirect}>Register</button>
            
            {/* <button type='button' className={style.submit_btn} onClick={connectTOmongoDB}>Connect to Database</button> */}
            </div>
            {riseError &&(
              <div className={style.Error_msg}>{riseError}</div>
            )}
            </form>
            
        </div>
        </> 
         )
}
