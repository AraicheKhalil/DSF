
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DocIntegration() {
  return (
    <Card className="min-w-[350px] lg:w-[650px] w-full  shadow-xl">
      <CardHeader>
        <CardTitle>Add Integrations</CardTitle>
        <CardDescription>Share and Deploy your new Documents in one-click, with your favorite method.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Integration name</Label>
              <Input id="name" placeholder="name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Integration">Integration type</Label>
              <Select>
                <SelectTrigger id="Integration">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="host">Host</Label>
              <Input id="host" placeholder="Host" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Port">Port</Label>
              <Input id="Port" placeholder="Port ( Optional )" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="db-name">Database name</Label>
              <Input id="db-name" placeholder="db name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="db-username">Database username</Label>
              <Input id="db-username" placeholder="name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Database password</Label>
              <Input id="password" type="password" placeholder="password" />
            </div>
          </div>
          <div className="flex justify-between pt-8">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Integrate </Button>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}

