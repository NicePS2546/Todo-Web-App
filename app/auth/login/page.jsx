import React from 'react'
import Login_form from '@/components/auth/login/Login_form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
export default async function login() {
  const session = await getServerSession(authOptions);
  
  if(session){
    redirect("/");
  };

  return (
    <>
     <Login_form/>
        </>
  )
}
