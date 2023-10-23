import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const PUT = async(req,{params}) =>{
    const completeTodo = await prisma.todos.update({
        where:{
            id:params.id
        },
        data:{
            isCompleted:true,
        }
    })
    return NextResponse.json(completeTodo , {status:200})
}