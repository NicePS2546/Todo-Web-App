"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";
export const metadata = {
  title: "Register",
  description: "Create by NICE",
};
const userPreform = {
  username: "",
  email: "",
  password: "",
};
const initialFormError ={
  username:null,
  password:null,
  email:null,
}

export default function () {
  //use to set value to variables
  const [userData, setUserdata] = useState(userPreform);
  const [FormError, setFormError] = useState(initialFormError);
  const [riseError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserdata((prevData) => ({ ...prevData, [id]: value }));
    

  };

  // useEffect(() => {
  //   const containRestricted = /\W/.test(userData.username);
    
  //   setFormError((prevFormError) => ({
  //     ...prevFormError,
  //     username: userData.username && containRestricted ? "Special characters are not allowed." : null
  //   }))
    
  // }, [userData.username])
 
  // useEffect(() => {
  //   if(userData.password !== "") {
  //     setFormError((prevFormError) => ({
  //       ...prevFormError,
  //       password: userData.password.length < 8 ? "Password must be at least 8 characters" : null
  //     }))
  //   } else {
  //     setFormError((prevFormError) => ({
  //       ...prevFormError,
  //       password: null
  //     }))
  //   }
  // }, [userData.password])

  const handle_submit = async (e) => {
    e.preventDefault(); // Prevent the default link navigation behavior
    setLoading(true)
  if(userData.username){
    const containRestricted = /\W/.test(userData.username);

    if(containRestricted){
      setFormError((prevFormError) => ({
        ...prevFormError,
        username: userData.username && containRestricted ? "Special characters are not allowed." : null
      }))
      
      return;
    }
     if(!containRestricted){ 
      setFormError((prevFormError) => ({
        ...prevFormError,
        username: null
      }))

     
    }
  }
  


    if(userData.password){
    if(userData.password.length < 8) {      
          setFormError((prevFormError) => ({
            ...prevFormError,
            password: userData.password.length < 8 ? "Password must be at least 8 characters" : null
          }))
          return;
        } else {
          setFormError((prevFormError) => ({
            ...prevFormError,
            password: null
          }))
        }
      }

    

    if (!userData.username || !userData.email || !userData.password) {
        setError("Please Enter all information");
        toast({
          title:"Register Status",
          description:`Please Enter all information`
        })
      return;
    }
    
    // if (FormError.username || FormError.email || FormError.password){
    //   setError("Please Enter Correct Information");
    //   toast({
    //     title:"Register Status",
    //     description:`Please Enter Correct Information`
    //   })
    //   return;
    // }
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        setLoading(false)
        
        if (res.status === 400) {
          toast({
            title:"Register Status",
            description:"User Already Exists"
          })
        }

        if (res.ok) {
          router.push("/");
             setError("");
             setFormError(initialFormError)
             
        } else {
          const data = await res.json();
          console.log(data);
          console.log("User registeration failed");
        }
      } catch (error) {
        console.log("Error occure during registeration: ", error);
      }
      console.log("submitted");
    }
    
  


  return (
    <>
      <Card className="w-full mx-auto max-w-md my-24">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handle_submit} className="flex flex-col space-y-3">
            <Label htmlFor="Username">Username</Label>
            <Input
              id="username"
              value={userData.username}
              className=""
              type="text"
              placeholder="Username"
              autoComplete="off"
              onChange={handleChange}
            />
            <Label className="text-destructive whitespace-pre">{FormError.username ? FormError.username : ""}</Label>
            <Label htmlFor="Email">Email</Label>
            <Input
              id="email"
              value={userData.email}
              className=""
              type="email"
              placeholder="Email"
              autoComplete="on"
              onChange={handleChange}
            />
            
            <Label htmlFor="Password">Password</Label>
            <Input
              id="password"
              value={userData.password}
              className=""
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
            <Label className="text-destructive whitespace-pre" >{FormError.password ? FormError.password : ""}</Label>
            <Button
              className="hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
              disabled={isLoading ? true : false}
              type="submit"
            >
              {isLoading ? <Loader2 className="animate-spin"></Loader2> : "Register"}
            </Button>
            <span>
              <Label>
                Already have an account ? <Link className=" text-green-500 hover:text-green-700" href={"/"}>Login</Link> Here
              </Label>
            </span>
            {/* {riseError && (
              <Label className="bg-red-500 mx-auto border-2  flex shadow-md p-2 lg:px-2 py-3 pr-2 rounded-lg">
                {riseError}
              </Label>
            )} */}
          </form>
        </CardContent>
      </Card>
      <Toaster/>
    </>
  );
}
