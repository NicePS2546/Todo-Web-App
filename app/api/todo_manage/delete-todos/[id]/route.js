import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const DELETE = async(req,{params}) =>{
    const delete_todo = await prisma.todos.delete({
        where:{
            id:params.id
        }
    })
    return NextResponse.json({delete_todo,message:"Deleted todo succesfully"},{status:200})
}