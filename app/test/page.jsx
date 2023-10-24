import { Loader2 } from 'lucide-react'


export default function page() {
    console.log("test")
    return (
      <div className="w-full my-96 h-full mx-auto flex justify-center items-center">
      <Loader2 className="text-primary h-20 w-20 animate-spin" />
    </div>
  )
}
