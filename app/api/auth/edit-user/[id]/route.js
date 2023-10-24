import { prisma } from "@/lib/db"
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export const PUT = async (req,{params}) =>{
    const { username, password } = await req.json();
    // console.log("this is ",username)
    const user = await prisma.users.findUnique({
        where: {
            id:params.id
        }
      })
    
    const checkUser = await compare(password,user.password)

    if(username && password){
        console.log(`Username: ${username} Password: ${password}` )
    }

    if(!checkUser) return;

    const editUser = await prisma.users.update({
        where:{
            id:params.id
        },
        data:{
            username: username
        }
    })
    
    return NextResponse.json(editUser,{status:200})
}
