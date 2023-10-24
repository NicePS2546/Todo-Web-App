import Register_form from '@/components/auth/register/Register_form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
export default async function register() {
  const session = await getServerSession(authOptions);

  if(session){
    redirect("/");
  };

  return (
    <>
    <Register_form/>
      </>
  )
}
