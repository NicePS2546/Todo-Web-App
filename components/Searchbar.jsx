"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import style from "@/styles/Nav.module.css";


export const Searchbar = ({onSearch}) => {
  const [searchquery, setSearchquery] = useState("");
  // const encoded_Data = encodeURI("hi");
  
  const handleChange = (e) => {
    setSearchquery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    onSearch(searchquery)
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchquery}
        onChange={handleChange}
        placeholder="Search Title"
        className={style.searchbar}
      />
      <h1>{searchquery}</h1>
      <button type="submit" className={style.search_btn}>
        <FaSearch className={style.icon} />
      </button>
    </form>
  );
};
