'use client';
import { DropdownMenuContent,DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import { UserCircle2 } from "lucide-react"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import {DialogContent, DialogTitle, Dialog, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog"
import { useRouter } from "next/navigation"
import { useToast } from "./ui/use-toast";

const initialUserData ={
    username:"",
    password:""
}
export const DropProfile = ({user}) =>{

    const [userData,setuserData] = useState(initialUserData)
    const {data:session} = useSession();
    // const { update } = useSession();

    
    
    const router = useRouter();
    const { toast } = useToast();
    const handleChange = (e) =>{
        const { id , value } = e.target;
        setuserData((preveData) => ({...preveData,[id]:value}))
    }
    const handleEditUsername = async ()=>{
        // console.log(data.username)
        try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/edit-user/${user.id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json", // Specify JSON content type
              },
              body: JSON.stringify({ username: userData.username, password:userData.password  }), // Send the updated username in the request body
            });
        const data = await res.json();
        
        console.log(data)

        if(res.ok){
            console.log("username has changed !")
            toast({
                title:"Changed Username!",
                description: `Change username from ${user.username} to ${data.username} Successfully`
            })
            
            router.push("/");
            router.refresh();
        }

        if(res?.error){
            switch(res?.error){
              case "Incorrect Password!":
                toast({
                    title:"Incorrect Password!",
                    description:"Please enter correct password!"
                }) 
                console.log(res.error);       
                break;
              default:
                null
            }
            }else{
              console.log("Changed Username")
              router.push("/");
              router.refresh();
          }
        
    }catch(error){
        toast({
            title:"Incorrect Password!",
            description:"Please enter correct password!"
            }) 
    }
    }
   

    const handle_singout = () => {
        signOut();
      }
    return(
   <>
   <div className="flex justify-between gap-3">
    {/* <Button onClick={() =>{update((prev) => ({...prev, username: userData.username})); console.log(session); }}>Update</Button> */}
        <Dialog>
            <DialogTrigger className="bg-white  mx-auto  flex  shadow-md p-2 lg:px-2 py-2 pr-2 rounded-lg transition-all hover:scale-105 duration-500 ease-in-out">Edit Username</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Username</DialogTitle>
                    <DialogDescription>Edit Your Username and Verify by enter password Here click save when you're done.</DialogDescription>
                </DialogHeader>
                <Label htmlFor="Username">Username</Label>
                <Input
                placeholder="Username"
                id="username"
                value={userData.username}
                onChange={handleChange}
                
                />
                <Label htmlFor="Password">Password</Label>
                <Input
                placeholder="Password"
                type="password"
                    id="password"
                    value={userData.password}
                    onChange={handleChange}               
                ></Input>
                <Button onClick={handleEditUsername}>Save</Button>
            </DialogContent>
        </Dialog>

   <DropdownMenu className="mx-auto">
    <DropdownMenuTrigger asChild>
        <Button variant="outline" className="shadow-md truncate md:w-40 hover:scale-105 transition-all duration-150 ease-in-out">
    
            <UserCircle2 /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuLabel className="shadow-md text-lg">{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        
        <DropdownMenuItem className="cursor-pointer shadow-md hover:scale-105 transition-all duration-150 ease-in-out" onClick={handle_singout}>
<h1 className="text-destructive">Log out</h1>
        </DropdownMenuItem>

    </DropdownMenuContent>
   </DropdownMenu> 
   </div>
   </>
   )
}