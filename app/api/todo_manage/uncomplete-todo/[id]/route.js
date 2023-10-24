import { prisma } from "@/lib/db"
import { NextResponse } from "next/server";

export const PUT = async(req,{params}) =>{
    const undoCompletedTodo = await prisma.todos.update({
        where:{
            id:params.id
        },
        data:{
            isCompleted: false,
        },
    })
    return NextResponse.json(undoCompletedTodo,{status:200})
}

