import React from 'react'
import Todo from '@/model/todo';
import { NextResponse } from 'next/server';

export const POST =  async(req) => {
    const {userId , title, des } = await req.js();

    const createTodo = await Todo.create({
        data:{ userId , title , des}
    });
    return NextResponse.json({message:"Succesfully added Todo", createTodo},{status:201});
}