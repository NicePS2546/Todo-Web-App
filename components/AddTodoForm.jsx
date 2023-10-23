"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardHeader, CardTitle,Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
const initialTodoForm = {
  title: "",
  description: "",
};
export const AddTodoForm = ({ userId }) => {
  const [todoData, setTodoData] = useState(initialTodoForm);
  const { toast } = useToast();
  const [riseError, setError] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setTodoData((prevdata) => ({ ...prevdata, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!todoData.title || !todoData.description){
      setError("Please Enter All fields")
      return;
    };

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
      toast({
        title: "Add todo success",
        description: todoData.title,
      })
      setTodoData(initialTodoForm);
      setError("");
      router.refresh();
    } else {
      console.log("something went wrong");
    }
  };
  return (
    <>
    <Card className="w-full max-w-md mx-auto overflow-hidden my-32">
      <CardHeader>
        <CardTitle>Nice Todos</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="" onSubmit={handleSubmit}>
          <div className="grid items-center w-full max-w-sm gap-2">
          <Label htmlFor="Title">Title</Label>
            <Input
            id="title"
            value={todoData.title}
            placeholder="Enter Title"
            className=""
            onChange={handleChange}
            />
            <Label htmlFor="Description">Description</Label>
            <Textarea
              id="description"
              value={todoData.description}
              className="resize-none"
              placeholder="Enter Description"
              onChange={handleChange}
            ></Textarea>
            <Button className="hover:bg-blue-700 hover:scale-110 transition-all duration-300 ease-in-out">Add Todo</Button>
            {riseError && (<Label className="bg-red-500 border-2 mx-auto border-black shadow-md p-2 lg:px-2 py-3 pr-2 rounded-lg">{riseError}</Label>)}
            </div>
            
        </form>
        
      </CardContent>
      
      </Card>    
    <Toaster/>
    </>
  );
};
