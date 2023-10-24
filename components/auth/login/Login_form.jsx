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
import Link from 'next/link';
import { Loader2 } from 'lucide-react';


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
  const [isLoading, setLoading] = useState("")
  const handleChange = (e) =>{
    const { id,value } = e.target
    setUserdata((prevData) => ({...prevData,[ id ]:value}))
  }
  

  const handle_login_submit = async (e) =>{
    e.preventDefault();
    
    if(!userdata.username || !userdata.password){
      setError("Please Enter Username and Password");
      return;
    }

    setLoading(true)
    const res = await signIn('credentials',{
        ...userdata,
        redirect:false
      });
      setLoading(false)
      if(res?.error){
        switch(res?.error){
          case "Username or Password Doesn't match":
            setError(res.error)  
            console.log(res.error);       
            break;
          default:
            console.log("something went wrong",res.error);
        }
        }else{
          console.log("connect login")
          router.push("/");
          router.refresh();
      }
    
  }
  
  
  return (
  <>
    <Card className="max-w-md mx-auto my-20">
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
          <Button variant="outline" className=' shadow-md bg-green-500 hover:bg-green-700 hover:scale-105 transition-all duration-300 ease-in-out' disabled={isLoading ? true : false} type="submit">{isLoading ? <Loader2 className="animate-spin"></Loader2> : "Login"}</Button>
        
        <div className='flex flex-col space-y-1.5'>
        <p>Don't have an account ? <Link className=' text-purple-500 hover:text-purple-700' href={"/auth/register"}>Register</Link></p>
        </div>
        {riseError &&(
          <div className='text-center flex'>
        <Label className="bg-red-500 border-2 mx-auto  flex border-black shadow-md p-2 lg:px-2 py-3 pr-2 rounded-lg" htmlFor="Error">{riseError}</Label>
        </div>)}
        </form>
      </CardContent>
      
    </Card>
        </> 
         )
}
