import { Card_UI } from './Card_UI';


    const get_todoCompleted = async (userId) =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todo_manage/get-todo-completed/${userId}`,{cache:'no-store'})
        return res.json();
    }
    const get_todoIncomplete = async (userId) =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todo_manage/get-todo-incompleted/${userId}`,{cache:'no-store'})
        return res.json();
    }
    
export const List_Todos = async ({userId}) => {
    const [inCompletedTodo, completedTodo] = await Promise.all([get_todoIncomplete(userId), get_todoCompleted(userId)]);
    // console.log(inCompletedTodo)
    
    return (
   <>
   <div className="container w-full mx-auto flex flex-col items-center gap-8 text-white">
     <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
       <h1 className="font-bold text-xl col-span-full ">Incompleted</h1>
       {inCompletedTodo.length > 0 ? inCompletedTodo.map((todo) => (
         <Card_UI key={todo.id} todos={todo}/>
       )) : (
         <p>{"Don't have anything todo yet"}</p>
       )}
     </section>

     <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       <h1 className="font-bold text-xl col-span-full ">Completed</h1>
       {completedTodo.length > 0 ? completedTodo.map((todo) => (
         <Card_UI key={todo.id} todos={todo}/>
       )) : (
         <p>{"No task has been completed yet."}</p>
       )}
     </section>
   </div>
 </>
   
  )
}
