import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req, id) =>{
    const completed_todos = await prisma.todos.findMany({
        where:{
            userId: id,
            isCompleted: true,
        },
        orderBy:{
            createdAt:"asc",
        },
    })
    return NextResponse.json({message:"Successfully fecthed get todos completed",todos},{status:200})
}