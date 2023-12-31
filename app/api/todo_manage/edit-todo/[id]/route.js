import { prisma } from "@/lib/db"
import { NextResponse } from "next/server";

export const PUT = async(req,{params}) =>{
    const {title,description} = await req.json();

    const update_result = await prisma.todos.update({
        where:{
            id:params.id
        },
        data:{
            title,description
        },
    });
    // const result = update_result.json();

    return NextResponse.json({message:"Edited Successfully",update_result},{status:200});
}