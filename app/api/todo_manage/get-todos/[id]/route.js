import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
export const GET = async (req, id) =>{
    try{
    const data = prisma.todos.findUnique({
        where:{
            id
        }
    });
    return NextResponse.json({message:"Fetched Data Successfully"},{status:200});
}catch(error){
    console.log(error);
    return NextResponse.json({message:"Error while fecthing todos"},{status:500});
}
}