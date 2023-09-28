"use client";
import React from 'react';
import style from '@/styles/login.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export const metadata = {
  title: 'Register',
  description: 'Create by NICE',
}
const preform = {
  username: "",
  email:"",
  password:""
}
export default function() {
  //use to set value to variables
  const [userData,setUserdata] = useState(preform);
  // const [name,setName] = useState("");
  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");
  const [riseError,setError] = useState("");
  const router = useRouter();
  const handleChange = (e)=> {
    const { id , value } = e.target;
    setUserdata(( prevData )=> ({...prevData, [id]: value}))
  }
  // const handle_username = (e) =>{
  //   setName(e.target.value)
  // };
  // const handle_password = (e) =>{
  //   setPassword(e.target.value)
  // };
  // const handle_email = (e) =>{
  //   setEmail(e.target.value)
  // };
  
  const handle_submit = async (e) =>{
    e.preventDefault(); // Prevent the default link navigation behavior
    if(!userData.username || !userData.email || !userData.password) {
      setError("Please Enter Your Username, Email, and Password");
      return;
    }else{
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log(res.status)
      if(res.status === 400){
        setError("User Already Exists");
      };
      if(res.status === 201){
        router.push("/")
      }else{
        const data = await res.json();
        console.log(data)
        console.log("User registeration failed");
      };
    
    }catch(error){
      console.log("Error occure during registeration: ",error);
    };
    console.log("submitted");

  };};

  return (
    <>
    <div className={style.container}>
      <label >Register</label>
            <form onSubmit={handle_submit} className={style.form_login}>
            <div>
            <input type='text' id='username' onChange={handleChange} className={style.input_bar} placeholder='Username'/>
            
            </div>
            <div>
            <input type='password' id='password'  onChange={handleChange} className={style.input_bar} placeholder='Password'/>
            </div>
            <div>
            <input type='email' id='email' onChange={handleChange} className={style.input_bar} placeholder='Email'/>
            </div>
            <button type='submit'className={style.submit_btn}>Register</button>
            <label>Already have an Account <Link className={style.font} href={'/auth/login'}>Login</Link></label>
            <div className={style.Error_container}>
            {riseError &&(
              <div className={style.Error_msg}>{riseError}</div>
            )}
            </div>

            
            </form>
            {/* <button type='submit' onClick={handle_click} className={style.submit_btn}>Register</button>
            <label>{name}</label> */}
        </div>
        </> 
  );
}
