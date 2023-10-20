import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const DELETE = async(req,id) =>{
    const delete_todo = await prisma.todos.delete({
        where:{
            id
        }
    })
    return NextResponse.json({message:"Deleted todo succesfully",delete_todo},{status:200})
}