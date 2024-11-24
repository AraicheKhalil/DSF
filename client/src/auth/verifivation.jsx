


import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const navigate = useNavigate()

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("")
        setSuccessMessage("")
      }, 5000) // Clear messages after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [error, successMessage])

  

  const handleChange = (index, value) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    const otpString = otp.join("")

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email : "araiche.tech@gmail.com", otp: otpString }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP')
      }

      setSuccessMessage('OTP verified successfully!')
      // Assuming successful verification redirects to dashboard
      setTimeout(() => navigate("/dashboard"), 2000)
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      const response = await fetch('/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        // Add any necessary data for resending OTP
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP')
      }

      setSuccessMessage('OTP resent successfully!')
      setResendTimer(30)
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="w-full max-w-md fixed top-4 z-50 px-4">
        {error && (
          <Alert variant="destructive" className="bg-red-100 border-red-400 text-red-800 animate-in fade-in-50 slide-in-from-top-full duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
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
      <div className="bg-muted rounded-lg shadow-xl">
        <Card className="w-full max-w-md shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-[17px] font-Poppins font-bold tracking-tight text-center">OTP Verification</CardTitle>
            <CardDescription className="text-center text-[13px]">
              Enter the 6-digit code sent to your email or phone.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
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
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-2xl transition duration-200 ease-in-out focus:ring-2 focus:ring-primary"
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col w-full space-y-3">
              <Button
                type="submit"
                className="w-full transition duration-200 ease-in-out transform hover:scale-105 h-fit text-[13px] py-[6px] px-[12px] shadow bg-gradient-to-t from-purple-700 to-purple-600 hover:bg-purple-400"
                disabled={isLoading || otp.some(digit => digit === "")}
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
    </div>
  )
}
