'use client';
import React from 'react'
import style from '@/styles/login.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CardHeader,Card, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
        router.refresh();
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
          router.refresh();
      }
      
    }catch(error){
      // console.log(error)
    }
  }
  
  
  return (
  <>
    <Card className="max-w-sm mx-auto my-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handle_login_submit} className='flex flex-col space-y-2'> 
          <Label htmlFor="Username">Username</Label>
          <Input id="username" 
          value={userdata.username}
          className=""
          onChange={handleChange}
          placeholder="Username"
          type="text"
          />
          <Label htmlFor="Password">Password</Label>
          <Input 
            id="password"
            onChange={handleChange}
            value={userdata.password}
            className=''
            placeholder="Password"
            type="password"
          />
          <Button className=' shadow-md bg-green-500 hover:bg-green-700' type="submit">Login</Button>
        </form>
      </CardContent>
    </Card>
        </> 
         )
}
