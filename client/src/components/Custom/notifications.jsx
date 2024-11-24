import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageSquare, UserPlus, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock notifications data
const notifications = [
  { id: 1, type: "message", content: "New message from Alice", time: new Date(2023, 5, 1, 13, 45), isNew: true },
  { id: 2, type: "friend", content: "Bob sent you a friend request", time: new Date(2023, 5, 1, 10, 30), isNew: true },
  { id: 3, type: "alert", content: "Your subscription is expiring soon", time: new Date(2023, 4, 31, 9, 0), isNew: false },
]

export default function Notifications() {
  const newNotificationsCount = notifications.filter(n => n.isNew).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {newNotificationsCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
              {newNotificationsCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex items-start py-3 px-4">
            <div className="flex-shrink-0 mr-3 mt-1">
              {notification.type === "message" && <MessageSquare className="h-5 w-5 text-blue-500" />}
              {notification.type === "friend" && <UserPlus className="h-5 w-5 text-green-500" />}
              {notification.type === "alert" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium">{notification.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(notification.time, { addSuffix: true })}
              </p>
            </div>
            {notification.isNew && (
              <div className="flex-shrink-0 ml-3">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}