import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req,id) =>{
    const get_incompleted_todos = await prisma.todos.findMany({
        where:{
            userId: id,
            isCompleted: false,
        },
        orderBy:{
            createdAt:"asc"
        },
    }) 
    return NextResponse.json({message:"Successfully fecthed incompleted todos",get_incompleted_todos},{status:200})
}