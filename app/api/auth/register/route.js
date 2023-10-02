import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";


export async function POST(req){
    try{
      const { username , email , password } = await req.json();
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { username: {equals: username} },
            { email: {equals: email},}
          ]
        }
      })

      if (existingUser){
        return NextResponse.json({ message: "User already Exist" },{ status: 400 });
      }
      const bitround = 10
       const hashPassword = await bcrypt.hash(password, bitround);
       console.log(username);

       const createdUser = await prisma.users.create({
        data: {
          username,
          email,
          password: hashPassword,
        },
      });
    
        
       return NextResponse.json({ message: "User registered.", createdUser }, { status: 201 });
    }catch(error){
        return NextResponse.json({message: "Error occure while register an user",error},{status:500});
    }
}


