"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const initialTodoForm = {
  title: "",
  description: "",
};
export const AddTodoForm = ({ userId }) => {
  const [todoData, setTodoData] = useState(initialTodoForm);
  const router = useRouter();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setTodoData((prevdata) => ({ ...prevdata, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!todoData.title || !todoData.description) return;

    const res = await fetch("/api/todo_manage/add-todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todoData, userId })
    });
    // console.log(todoData)
    const data = await res.json();
    console.log(data)
    if(res.status === 500){
      console.log("Error")
    }
    if(res.ok) {
      console.log("successfully created todo list");
      setTodoData(initialTodoForm);
      router.refresh();
    } else {
      console.log("something went wrong");
    }
  };
  return (
    <div className="main-body">
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <span>
              <label className="label-title">Nice Web Todo</label>
            </span>
            <div>
              <div className="title-container">
                <input
                  id="title"
                  value={todoData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="input-bar"
                />
              </div>
              <div className="description-container">
                <input
                  id="description"
                  value={todoData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="input-bar"
                />
              </div>
              <button type="submit" className="input-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
