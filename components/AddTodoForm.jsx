'use client';
import React from 'react'
import { useState } from 'react'

const initialTodoForm = {
    title: "",
    description: "",
  }
export const AddTodoForm = () => {

  const [todoData,setTodoData] = useState(initialTodoForm);
  const handleChange = (e) =>{
    const { id ,value} = e.target;
    setTodoData((prevdata) => ({...prevdata, [id]:value}));
  }
  const handleSubmit = async (e) =>{
    const res =  await fetch('/api/todo_manage/add-todo',{
      method:POST,
      headers: {"Contents-Type":"application/json"},
      body:JSON.stringify({
        ...todoData , userId
      })
    })
  }
  return (
    <div className="main-body">
      <div className="container">
        <div>
          <form>
            <span>
              <label className="label-title">Nice Web Todo</label>
            </span>
            <div>
            <div className="title-container">
              <input id='title' onChange={handleChange} placeholder="Title" className="input-bar" />
            </div>
            <div className="description-container">
              <input id='description' onChange={handleChange} placeholder="Description" className="input-bar" />
            </div>
             <button className="input-btn">Submit</button>
             </div>        
          </form>
        </div>
        
      </div>
    </div>
  )
}
