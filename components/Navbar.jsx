'use client';
import React, { useState } from "react";
import Image from "next/image";
import style from "@/styles/Nav.module.css";
import Link from "next/link";
import { Searchbar } from "./Searchbar";
import {  useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { LogOut } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

import { DropProfile } from "./DropDownProfile";

export default function Navbar() {
  const {data:session, status} = useSession();
  const [getSignout, setGet] = useState(false);
  if(session){
    console.log(session.user.username)
  }
  
  // const searchTodos = async (title) => {
  //   try {
  //     // setLoading(true);
  //     const res = await fetch(`/api/search-data/${title}/route`);
  //     const data = await res.json();
  //     if(res.ok) console.log("data fecthed")
  //     setSearchResults(data);
  //   } catch (error) {
  //     console.error('Error searching todos:', error);
  //   // } finally {
  //   //   setLoading(false);
  //   }
  // };
  
  return (
    <>
      <nav className="bg-blue-500 flex justify-between items-center p-1.5">
        
        <div className={style.logo_pos}>
          <div className={style.title}>
            <Link href={"/"}>Nice Todo</Link>
          </div>
          <Link href={"/"}>
            <Image
              src={"/favicon.ico"}
              width={40}
              height={150}
              className={style.logo}
              alt="logo"
            ></Image>
          </Link>
        </div>
         {/* <div className={style.searchcontainer}>
           <Searchbar onSearch={searchTodos} /> 
        </div>  */}
        {session&&(
         <DropProfile user={session.user}/> 
        )}
        
        {/* <NavigationMenu className="list-none">
          <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Logout
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
      </nav>
    </>
  );
}

