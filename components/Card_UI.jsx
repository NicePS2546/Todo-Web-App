'use client';
import { useRouter } from "next/navigation";
import { CheckIcon, Trash2, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { AlertDialog,AlertDialogContent, AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

const initialTodoForm = {
  title: "",
  description: "",
};

export const Card_UI = ({ todos }) => {
  const router = useRouter();
  const [todoform, setTodosForm] = useState(initialTodoForm);
  const { toast } = useToast();
  const handleChange = (e) =>{
    const { id , value } = e.target;

    setTodosForm((prevData) => ({...prevData, [id]:value}))
  }
  // const [alertConfirm, setAlertConfim] = useState(false);
  console.log(todos)
  useEffect(() => {
    const fectTodo = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todo_manage/get-todos/${todos.id}`);
      const data = await res.json();
      setTodosForm({
        title: data.title,
        description: data.description,
      });
    };
    fectTodo();
  }, [todos]);

    const handleCompleted = async () =>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todo_manage/complete-todo/${todos.id}`,{method:"PUT"})
      if (res.ok) {
      router.refresh();
      toast({
        title:"Congratulation",
        description:`Successfully Completed ${todos.title}`
      })
    }
  }
    
  
  const handleEdit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todo_manage/edit-todo/${todos.id}`, {
      method: "PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(todoform)
    });
    if (res.ok) {
      console.log("ok")
      toast({
        title:"Edit Todo",
        description: `Successfully Editted Todo ${todos.title}`
      })
      router.refresh();
    }
    const data = await res.json();
    console.log("Edit data:",data)

    
  };
const handleDelete = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todo_manage/delete-todos/${todos.id}`,{
        method:"DELETE"
    })
    if(res.ok){
        router.refresh();
        toast({
          title:"Delete Todo",
          description:`Successfully Delete Todo ${todos.title}`
        })
    }
}
  return (
    <>
    <Card className={`${todos.isCompleted && "opacity-60"} shadow-md w-full justify-between flex flex-col hover:scale-105 transition-all duration-200 ease-in-out `}>
      <CardHeader>
        <CardTitle>{todos.title}</CardTitle>
        <CardDescription>{todos.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-3">
          {! todos.isCompleted && (
            <> 
            <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-700 transition-all hover:scale-125 duration-500 ease-in-out" variant="outline"><CheckIcon/></Button>
            </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Are You completed your task?</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancle</AlertDialogCancel>
              <AlertDialogAction onClick={handleCompleted}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          </AlertDialog>
            <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className=" bg-blue-500 hover:bg-blue-700 transition-all hover:scale-125 duration-500 ease-in-out" variant="outline"><Settings/></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Edit Todo</AlertDialogTitle>
              <div className="grid w-full items-center gap-3">
              <Label htmlFor="Title">Title</Label>
              <Input id="title"
              placeholder="Title"
              value={todoform.title}
              onChange={handleChange}
              ></Input>
              <Label htmlFor="Description">Description</Label>
              <Textarea id="description"
              value={todoform.description}
              className="resize-none"
              placeholder="Description"
              onChange={handleChange} 
              ></Textarea>
              <AlertDialogAction onClick={handleEdit}>Edit</AlertDialogAction>
              </div>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
          </>
          )}

           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-500 hover:bg-red-700 transition-all hover:scale-125 duration-500 ease-in-out" variant="outline"><Trash2/></Button>
            </AlertDialogTrigger>
           <AlertDialogContent>
            <AlertDialogTitle>
              Are you sure you want to delete todo name {todos.title}
            </AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete your Todo</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-700 " onClick={handleDelete}>Yes</AlertDialogAction>
            </AlertDialogFooter>
           </AlertDialogContent>
          </AlertDialog>
      </CardFooter>
    </Card>
    
</>
  )
};
