

import GooglePrBtn from '@/components/GooglePrivider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React from 'react'
import { Link } from 'react-router-dom'



function Login() {
  return (
    <div className="Login h-screen font-poppins">
    <div className=" flex h-full max-lg:justify-center ">
      <div className="bg-gray-200 w-full max-lg:hidden">
        <img className="h-full w-full object-cover" src="/store.jpg" />
      </div>
      <div className="form-container px-6 pt-10 lg:px-12 max-w-[500px] w-full ">
        <Link href="/" className="logo text-main text-4xl font-Volkhov">Smart Doc</Link>

        <form action="hidden" className="">
          <p className="mt-10 mb-6 text-xl font-semibold">Hey, Nice to see You again 👋 </p>

          <div className="grid w-full items-center gap-1.5 mb-4 ">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter Your Email" className="w-full "/>
          </div>
          <div className="grid w-full items-center gap-1.5 mb-4 ">
            <Label htmlFor="Password">Password</Label>
            <Input type="Password" id="Password" placeholder="Enter Your Password" className="w-full "/>
          </div>

          <div className="flex justify-between items-center ">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" className=" "/>
              <Label htmlFor="airplane-mode" className="text-xs">Remember me </Label>
            </div>

            <Link href="/" className="text-[#007aff] text-xs">
              Forgot password?
            </Link>
          </div>

          <Button className="my-8 w-full bg-[#007aff] px-6 py-[10px] font-semibold tracking-wide ">Login</Button>
        </form>

        <hr />

        <div className="provides flex flex-col my-6">
          <GooglePrBtn />
        </div>


        <div className="flex justify-center text-xs">
          <p>Dont have an account?</p>
          <Link href="/auth/signup" className="text-[#007aff] ml-2">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login