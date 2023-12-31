import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] });
import { AddTodoForm } from "@/components/AddTodoForm";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { List_Todos } from "@/components/List_Todos";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  // console.log(session)
  if(!session || !session.user){
    redirect("/auth/login");
  };
  
  return (
    <>
   <AddTodoForm userId = {session.user.id}/>
   <List_Todos userId={session.user.id}/>
   
   </>);
}
