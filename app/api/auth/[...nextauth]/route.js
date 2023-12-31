import NextAuth from "next-auth";
import { prisma } from "@/lib/db";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  
     session: {
      strategy:"jwt",
     },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {},
            async authorize(credentials, req){
                const { username, password } = credentials
               
                const user = await prisma.users.findUnique({
                  where: 
                  { username: username.toLowerCase() }
                })
                
                // console.log("user = ",user,"id = ",user.id); 
                if(!user) throw new Error("Username or Password Doesn't match");
                
                const isValidPassword = await compare(password, user.password);
                console.log(isValidPassword);
                if(user && isValidPassword){
                  console.log("Login Sucessfully");
                };
                if(!isValidPassword) throw new Error("Username or Password Doesn't match");
                
                return user
            },
        }),
    ],
    
    callbacks:{
      async jwt({ token, user, session }) {
        
        
        if(user) {
          token.id = user.id;
          token.username = user.username;
        }
        return token;
      },
      async session({ session, token }) {
        if(session.user) {
          session.user.id = token.id
          session.user.username = token.username;
        }
        return session;
      
    },
    }
  
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
