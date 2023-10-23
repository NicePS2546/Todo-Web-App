import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST =  async(req) => {
    const {userId , title, description } = await req.json();
    
    const createdTodo = await prisma.todos.create({
        data: {
          userId, title, description
        },
      })
    return NextResponse.json({message:"Succesfully added Todo", createdTodo},{status:201});
}
