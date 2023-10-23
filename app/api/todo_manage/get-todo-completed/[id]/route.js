import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req, {params:{id}}) =>{
    
    const completed_todos = await prisma.todos.findMany({
        where:{
            userId: id,
            isCompleted: true,
        },
        orderBy:{
            CreateAt:"asc",
        },
    })
    return NextResponse.json(completed_todos , { status: 200 })
}