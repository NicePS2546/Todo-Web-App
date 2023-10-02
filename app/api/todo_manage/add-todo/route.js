import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST =  async(req) => {
    try{
    const {userId , title, description } = await req.json();
    console.log(userId, title,description)
    const createdTodo = await prisma.todos.create({
        data: {
          userId, title, description
        },
      })
    return NextResponse.json({message:"Succesfully added Todo", createdTodo},{status:201});
}catch(error){
    return NextResponse.json({message:"Error cant add todo", error},{status:500});
}
}