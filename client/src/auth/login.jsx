'use client'

import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AppContext } from '@/context/AppContext'; // Your AuthProvider context
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import microsoft from "@/Assets/images/microsoft.png"
import SmtLogo from "@/Assets/images/logo.png"

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const URL = "http://localhost:5000/api/v1"
const Production = "https://dsf-saas.onrender.com/api/v1"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeOTP,setActiveOTP] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [resendTimer, setResendTimer] = useState(60)
  const { login } = useContext(AppContext);
  const navigate = useNavigate()

  console.log('hi')

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("")
        setSuccessMessage("")
      }, 5000) // Clear messages after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [error, successMessage])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    try {
      const response = await fetch(`${Production}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        console.error('Login failed:', response.status, data?.err)
        setError(data?.err)

        if (data?.isVerified == false) {
          setError(data?.message)
          await new Promise((res) => setTimeout(res,3000))
          setActiveOTP(true)
          setResendTimer(60)
        }

        // if (data?.err == "Please verify your account first.") {
        //   await new Promise((res) => setTimeout(res,3000))
          
        // }

        throw new Error(data?.err || `HTTP error! status: ${response.status}`)
      }

      console.log('Login successful:', data)
      setSuccessMessage(data.message || 'Login successful!')
      login(data.token, data.user);

      await new Promise((res) => setTimeout(res,3000))
      console.log("dash")
      if(!data.user.isProfileComplete){
        navigate("/prefrences");
      }else {
        navigate("/dashboard");
        // console.log(data.user.isProfileComplete)
      }

    } catch (err) {
      console.error('Login error:', err)
      if (activeOTP){
        setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.')
      }
      
    } finally {
      setIsLoading(false)
    }
  }

  // otp 

  const handleChangeOTP = (index, value) => {
    if (value.length <= 1 && !isNaN(Number(value))) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move to next input
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    const otpString = otp.join("")

    console.log({ email : email , otp: otpString })
    try {
      const response = await fetch(`${Production}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email : email , otp: otpString }),
      })

      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        throw new Error(data.err || 'Failed to verify OTP')
      }

      login(data.token, data.user);
      setSuccessMessage('OTP verified successfully!')
      await new Promise((res) => setTimeout(res,3000))

      if(!data.user.isProfileComplete){
        navigate("/prefrences");
      }else {
        navigate("/dashboard");
        // console.log(data.user.isProfileComplete)
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${Production}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email : email }),
        // Add any necessary data for resending OTP
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP')
      }

      setSuccessMessage('OTP resent successfully!')
      setResendTimer(60)
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50  flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100  p-4">
      <div className="w-full max-w-md fixed top-4 z-50 px-4">
        {error && (
          <Alert variant="destructive" className="bg-red-100 border-red-400 text-red-800 animate-in fade-in-50 slide-in-from-top-full duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unauthorized</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert variant="default" className="bg-green-100 border-green-400 text-green-800 animate-in fade-in-50 slide-in-from-top-full duration-300">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
      </div>
      {
        activeOTP ? (
          <div className="bg-muted rounded-lg shadow-xl">
            <Card className="w-full max-w-md shadow-none">
              <CardHeader className="space-y-1">
                <img src="" alt="logo" />
                <CardTitle className="text-[17px] font-Poppins font-bold tracking-tight text-center">OTP Verification</CardTitle>
                <CardDescription className="text-center text-[13px]">
                  Enter the 6-digit code sent to your email or phone.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleOTPSubmit}>
                <CardContent className="space-y-3">
                  <div className="flex justify-between space-x-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChangeOTP(index, e.target.value)}
                        className="w-12 h-12 text-center text-2xl transition duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full space-y-3">
                  <Button
                    type="submit"
                    className="w-full transition duration-200 ease-in-out transform hover:scale-105 h-fit text-[13px] py-[6px] px-[12px] shadow bg-gradient-to-t from-gray-700 to-gray-600 hover:bg-gray-400"
                    disabled={isLoading || otp.some(digit => digit === "")}
                    onClick={handleOTPSubmit}
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-fit text-[13px] py-[6px] px-[12px]"
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0}
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        ) : (
          <div className="bg-muted rounded-lg shadow-xl">
            <Card className="w-full  max-w-md shadow-none">
              <CardHeader className="space-y-1">
                <img src={SmtLogo} className="mx-auto mb-1 w-[3rem] h-[3rem]" />
                <CardTitle className="text-[17px] font-Poppins font-bold tracking-tight text-center">Login to your account</CardTitle>
                <CardDescription className="text-center text-[13px]">
                  Welcome Back! Please fill in the details to be Authenticated.
                </CardDescription>
              </CardHeader>
              {/* <div className="flex gap-3 items-center  w-full px-6 mt-2 ">
                  <Button
                    type="button"
                    className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 h-fit text-[13px] py-[6px] px-[12px] shadow  "
                  >
                    <FcGoogle className="mr-2 w-[1rem] h-[1rem]" /> Google
                  </Button>
                  <Button
                    type="button"
                    className=" w-full bg-[#2F2F2F] hover:bg-[#1E1E1E] text-white h-fit py-[6px] px-[12px] !m-0 text-[13px]"
                  >
                    <img src={microsoft} className="mr-2 w-[1rem] h-[1rem]" /> Microsoft
                  </Button>
                </div> */}
                <div className="flex items-center mb-4 w-full px-5">
                  <div className="flex-grow border-t border-gray-300"></div>
                  {/* <span className="mx-2 text-gray-500 text-[15px]">or</span> */}
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-[13px] font-Exo-2">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primary py-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-[13px] font-Exo-2">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="........................"
                      className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primarypy-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px] placeholder:text-3xl  placeholder:font-bolder "
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full">
                  <Button
                    type="submit"
                    className="w-full transition duration-200 ease-in-out transform hover:scale-105  h-fit text-[13px] py-[6px] px-[12px] shadow bg-gradient-to-t from-gray-700 to-gray-600 hover:bg-gray-400 "
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Continue'}
                  </Button>
                  
                </CardFooter>
              </form>
            </Card>
            <div className="flex justify-center gap-1.5  items-center py-4 text-[13px] text-muted-foreground">
              <p> New to SmartDoc ?</p> 
              <Link to={"/register"} className="font-semibold text-gray-700"> Create an account </Link>
            </div>
            <div className="flex justify-center gap-1.5  items-center py-4  text-[13px] text-muted-foreground  border-t">
              {/* <p>Already have an account ?</p>  */}
              <Link to={"/request-password-reset"} className=" underline text-gray-700 hover:text-gray-500"> Forgot password? </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}