import { DropdownMenuContent,DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
export const DropProfile = ({username}) =>{
    const handle_singout = () => {
        signOut();
      }
    return(
   <>
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button className="shadow-md hover:scale-105 transition-all duration-150 ease-in-out">{username}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuLabel className="shadow-md">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="cursor-pointer shadow-md hover:scale-105 transition-all duration-150 ease-in-out" onClick={handle_singout}>
<h1 className="text-destructive">Log out</h1>
        </DropdownMenuItem>

    </DropdownMenuContent>
   </DropdownMenu> 
   </>
   )
}