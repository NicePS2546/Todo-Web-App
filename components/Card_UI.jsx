import { useRouter } from "next/navigation";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
const initialTodoForm = {
  title: "",
  description: "",
};

export const Card_UI = ({ todos }) => {
  const router = useRouter();
  const [todoform, setTodosForm] = useState(initialTodoForm);
  const [alertConfirm, setAlertConfim] = useState(false);
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
  }, [todos.id]);

  const handleCompleted = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todo_manage/get-todo-completed/${todos.id}`, {
      method: "PUT",
    });

    if (res.ok) {
      router.refresh();
    }
  };
  const handleInCompleted = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/todo_manage/get-todo-incompleted/${todos.id}`,
      {
        method: "PUT",
      }
    );

    if (res.ok) {
      router.refresh();
    }
  };
  const handleEdit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/todos_manage/edit-todo/${todos.id}`, {
      method: "PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(todoform)
    });
    const data = await res.json();
    console.log("Edit data:",data)

    if (res.ok) {
      router.refresh();
    }
  };
const handleDelete = async () =>{
    const res = await fetch(`${process.env.NEXTAUTH_PUBLIC_URL}/api/todos_manage/delete-todos/${todos.id}`,{
        method:"DELETE"
    })
    if(res.ok){
        router.refresh();
    }
}
  return (
    // <div className={`${todos.isCompleted}`}>
    //   <div className={stlye.card_header}>
    //     <div className={style.card_title}>{todos.title}</div>
    //   <div className={style.card_description}>{todos.description}</div>
    //   </div>
    //   <div className={style.card_footer}>
    //     {!todos.isCompleted && (
    //       <dialog>Are you comepleted?</dialog>

    //     )}
        
    //   </div>
    //   </div>
<>
  <div className={`${style.alertdialog} ${todos.isCompleted ? "opacity-60" : ""} w-full shadow-md duration-100 hover:scale-105 overflow-hidden flex flex-col justify-between`}>
    <div className="header">
      <h2 className="truncate">{todos.title}</h2>
      <p className="line-clamp-3 break-all">{todos.description}</p>
    </div>
    <div className="footer flex gap-2">
      {!todos.isCompleted && (
        <>
          <div class="alert-dialog">
            <button className="button bg-green-500 hover:bg-green-700 cursor-pointer" type="checkbox" onClick={handleCompleted}>
            <CheckIcon/>
            </button>
          </div>
          <div class="alert-dialog">
            <button className="button blue" onClick={handleEdit}>
              
            </button>
          </div>
        </>
      )}
      <div className="alert-dialog">
        <button className="button red" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  </div>
</>
  )
};
