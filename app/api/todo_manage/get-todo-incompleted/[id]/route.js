import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req,{params:{id}}) =>{
    
    const get_incompleted_todos = await prisma.todos.findMany({
        where:{
            userId: id,
            isCompleted: false,
        },
        orderBy:{
            CreateAt:"asc",
        },
    }) 
    
    return NextResponse.json(get_incompleted_todos,{ status: 200 })
}