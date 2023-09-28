'use client';
import React, { useState } from "react";
import Image from "next/image";
import style from "@/styles/Nav.module.css";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [getSignout, setGet] = useState(false);
  const handle_singout = () => {
    
     signOut();
    if(signOut()){
      setGet(true)
    }else{
      setGet(false)
    }
    
    return getSignout;
  }

  // console.log(getSignout)
  
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
        <div className={style.searchcontainer}>
          <form>
            <input
              type="text"
              placeholder="Search ID"
              className={style.searchbar}
            />
            <button className={style.search_btn}>
              <FaSearch className={style.icon} />
            </button>
          </form>
        </div>
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

