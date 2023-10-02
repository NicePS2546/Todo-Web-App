import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] });
import Addtodo, { AddTodoForm } from "@/components/AddTodoForm";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function HomePage() {
  const session = await getServerSession(authOptions);
  // console.log(session)
  if(!session || !session.user){
    redirect("/auth/login");
  };
  // if(session){
  //   console.log(session.user.id)
  //   console.log(session)
  // }
  return (
    <>
   <AddTodoForm userId = {session.user.id}/>
   </>);
}
