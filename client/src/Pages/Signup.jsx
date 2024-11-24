import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Link } from 'react-router-dom'
Input

export default function Signup() {
  return (
    <div className="Login h-screen font-poppins">
      <div className=" flex h-full max-lg:justify-center ">
        <div className="bg-gray-200 w-full max-lg:hidden">
          <img className="h-full w-full object-cover" src="/store-4.jpg" />
        </div>
        <div className="form-container px-6 pt-10 lg:px-12 max-w-[500px] w-full ">
          <Link to="/" className="logo text-main text-4xl font-Volkhov">FASCO</Link>

          <form action="hidden" className="">
            <p className="mt-10 mb-6 text-xl font-semibold">Welcome to Smart Doc 👋 </p>

            <div className="grid w-full items-center gap-1.5 mb-4 ">
              <Label htmlFor="name">Full Name</Label>
              <Input type="text" id="name" placeholder="Enter Your Full Name" className="w-full focus:ring-0 "/>
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4 ">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Enter Your Email" className="w-full "/>
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4 ">
              <Label htmlFor="Password">Password</Label>
              <Input type="Password" id="Password" placeholder="Enter Your Password" className="w-full "/>
            </div>

            <Button className="my-4 w-full bg-[#007aff] px-6 py-[10px] font-semibold tracking-wide ">Sign up </Button>
          </form>

          <hr />

          <div className="provides flex flex-col my-6">
            <Button className="flex gap-3 items-center">
              <img src="/google.png"/>
              <p>Sign up with Google</p>
            </Button>
          </div>


          <div className="flex justify-center text-xs">
            <p>already have an account?</p>
            <Link to="/auth/login" className="text-[#007aff] ml-2">
              Login now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
