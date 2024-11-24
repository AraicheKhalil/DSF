/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mMt9ybM3Jc1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function SmtChat() {
  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <header className="flex items-center h-16 px-4 border-b bg-card shadow-sm md:px-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <BotIcon className="w-6 h-6" />
          <span>ChatGPT</span>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid gap-4 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" alt="You" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 bg-card p-3 rounded-lg max-w-[75%]">
              <div className="font-medium">You</div>
              <div className="prose text-muted-foreground">
                <p>Hi there! Can you explain to me how airplane turbulence works?</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="grid gap-1 bg-primary p-3 rounded-lg max-w-[75%] text-primary-foreground">
              <div className="font-medium">ChatGPT</div>
              <div className="prose">
                <p>
                  Absolutely! Airplane turbulence happens when the plane encounters pockets of air that are moving
                  differently. It's similar to driving on a bumpy road - the plane can feel like it's bouncing or
                  shaking a bit as it hits these air pockets.
                </p>
                <p>
                  It's completely normal and usually not dangerous at all. Turbulence is just the plane adjusting to
                  changes in the air around it. As long as the seatbelt sign is on, you don't need to worry - the plane
                  is designed to handle this kind of thing.
                </p>
              </div>
            </div>
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" alt="ChatGPT" />
              <AvatarFallback>OA</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" alt="You" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 bg-card p-3 rounded-lg max-w-[75%]">
              <div className="font-medium">You</div>
              <div className="prose text-muted-foreground">
                <p>That makes a lot of sense, thank you!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-card p-4 flex items-center gap-2 md:p-6">
        <Textarea
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-none focus:ring-0 focus:ring-offset-0 focus:outline-none resize-none"
          rows={1}
        />
        <Button type="submit" className="shrink-0">
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  )
}

function BotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}