import { getSession } from "next-auth/react"
import { NextResponse } from "next/server";

export const POST = async (req)=>{
    const { username } = await req.json()
    const session = await getSession({req})
    console.log(username)
    if (session) {
      // Generate a new access token with updated user information (e.g., updated username)
      const newAccessToken = sign(
        { user: { ...session.user, username: username } }, // Update user data as needed
        process.env.NEXTAUTH_SECRET, // Your NextAuth.js secret
        {
          expiresIn: '100m', // Set the expiration time
        }
      );

      // Send the new access token in the response
      
      return NextResponse.json({accessToken:newAccessToken},{status:200})
}
}