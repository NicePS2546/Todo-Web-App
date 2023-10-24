'use client';

import { Loader2 } from "lucide-react";

const loadingPage = () => {
  return (
    <>
     <div className=" w-full my-96 h-full mx-auto flex justify-center items-center">
      <Loader2 className=" animate-spin text-primary w-20 h-20"></Loader2>
    </div>
    </>
  )
}
export default loadingPage;
