"use client";
import React from 'react';
import style from '@/styles/login.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardContent, CardHeader, CardTitle,Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export const metadata = {
  title: 'Register',
  description: 'Create by NICE',
}
const userpreform = {
  username: "",
  email:"",
  password:""
}
export default function() {
  //use to set value to variables
  const [userData,setUserdata] = useState(userpreform );
  const [riseError,setError] = useState("");
  const router = useRouter();
  const handleChange = (e)=> {
    const { id , value } = e.target;
    setUserdata(( prevData )=> ({...prevData, [id]: value}))
  }

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
        router.push("/");
        
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
    <Card className="w-full mx-auto max-w-md my-24">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handle_submit} className='flex flex-col space-y-3'>
        <Label htmlFor="Username">Username</Label>
        <Input id="username"
        value={userData.username}
        className=""
        type="text"
        placeholder="Username"
        autocomplete="off"
        onChange={handleChange}
        />
        <Label htmlFor="Email">Email</Label>
        <Input id="email"
        value={userData.email}
        className=""
        type="email"
        placeholder="Email"
        autocomplete="on"
        onChange={handleChange}/>
          <Label htmlFor="Password">Password</Label>
          <Input id="password"
        value={userData.password}
        className=""
        type="password"
        placeholder="Password"
        autocomplete="off"
        onChange={handleChange}/>
        <Button className="hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out" type="submit">Register</Button>
        </form>
      </CardContent>
            {riseError &&(
              <div className={style.Error_msg}>{riseError}</div>
            )}
            
            </Card>
            
            
            {/* <button type='submit' onClick={handle_click} className={style.submit_btn}>Register</button>
            <label>{name}</label> */}
        
        </> 
  );
}
