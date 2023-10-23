import { prisma } from "@/lib/db";
import { connectTOmongoDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export const GET = async (req,{params}) => {
  const get_search = await prisma.todos.findMany({
    where:{
      title: params.title
    }
  })
  return NextResponse.json(get_search,{status:200})
}