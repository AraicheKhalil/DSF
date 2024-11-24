import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppContext } from "@/context/AppContext"
import { LogOut, Settings, User } from "lucide-react"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function UserProfileDrop() {
  const { auth , logout} = useContext(AppContext);
  const navigate = useNavigate()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 px-1 py-1.5">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium">{auth?.user?.name} {auth?.user?.lastname}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem> */}
        <Link to={"settings"}>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>            
                Settings
            </span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link 
          to={"/login"}
          className="w-full"
          onClick={() => logout()}>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>

        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}