'use client';
import React, { useState } from "react";
import Image from "next/image";
import style from "@/styles/Nav.module.css";
import Link from "next/link";
import { Searchbar } from "./Searchbar";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [getSignout, setGet] = useState(false);
  const handle_singout = () => {
    signOut();
  }
  const searchTodos = async (title) => {
    try {
      // setLoading(true);
      const res = await fetch(`/api/search-data/${title}/route`);
      const data = await res.json();
      if(res.ok) console.log("data fecthed")
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching todos:', error);
    // } finally {
    //   setLoading(false);
    }
  };
  return (
    <>
      <nav className={style.navbar}>
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
        <div className={style.menu}>
            <ul>
              <li className={style.head_list}>
                <button type="button" className={`${style.link} ${style.back_ground}`} onClick={handle_singout}>Logout</button>
              </li>
              <li className={style.head_list}>
                <Link className={style.link} href="./gamepage">game</Link>
              </li>
              <li className={style.head_list}>
                <Link className={style.link} href="/">test</Link>
              </li>
            </ul>
        </div>
      </nav>
    </>
  );
}

