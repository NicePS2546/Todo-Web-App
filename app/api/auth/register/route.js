import { NextResponse } from "next/server";
import { connectTOmongoDB } from "@/lib/mongo_db";
import User from "@/model/user";
import bcrypt from "bcryptjs";


export async function POST(req){
    try{
      await connectTOmongoDB(); //connect to mongoDB database
      const { username , email , password } = await req.json();
      const user = await User.findOne({ email }).select("_id");

      if (user){
        return NextResponse.json({ message: "User already Exist" },{ status: 400 });
      }
       const hashpassword = await bcrypt.hash(password, 10);
       console.log(username);
        await User.create({ username, email, password: hashpassword})
        
       return NextResponse.json({ message: "User registered." }, { status: 201 });
    }catch(error){
        return NextResponse.json({message: "Error occure while register an user",error},{status:500});
    }
}


