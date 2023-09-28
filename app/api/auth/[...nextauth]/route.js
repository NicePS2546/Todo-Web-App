import NextAuth from "next-auth";
import User from "@/model/user";
import { connectTOmongoDB } from "@/lib/mongo_db";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";


export const authOptions = {
    session: {
      strategy:"jwt",
     },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {},
            async authorize(credentials, req){
                const { name, password } = credentials
                await connectTOmongoDB();
                const user = await User.findOne({ name });
                // const id = await User.findOne({ name }).select("_id")
                console.log("user = ",user,"id = ",user.id)
                if(!user) throw new Error("Username or Password Doesn't match");
                
                const isValidPassword = await compare(password, user.password);
                console.log(isValidPassword);
                if(user && isValidPassword){
                  console.log("Login Sucessfully");
                };
                if(!isValidPassword) throw new Error("Username or Password Doesn't match")
                
                return user && NextResponse.json({message: "Logged in"}, {status: 201});
            },
        }),
    ],
    
    // callbacks: {
    //   async jwt(token, user) {
    //     console.log("JWT callback - user:", user);
    //     // if (user) {
    //     //   token.id = user._id; // Use user._id instead of id
    //     //   token.name = user.username;
    //     // }
    //     // return token;
    //   },
    
    //   // async session(session, token) {
    //   //   console.log("Session callback - token:", token);
    //   //   if (token.id) {
    //   //     session.user.id = token.id;
    //   //     session.user.name = token.name;
    //   //   }
    //   //   return session;
    //   // },
    // },
    
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
