import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  let { token } = useParams();
  const URL = "http://localhost:5000/api/v1"
  const Production = "https://dsf-saas.onrender.com/api/v1"

  console.log(token)

//   useEffect(() => {
//     // Extract token from URL

//     if (tokenFromUrl) {
//       setToken(tokenFromUrl)
//     } else {
//       setError("No reset token found. Please request a new password reset.")
//     }
//   }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPasswords(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${Production}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passwords.password , token : token }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.err || `HTTP error! status: ${response.status}`)
      }

      setSuccessMessage(data.message || 'Password reset successfully!')
      setPasswords({ password: "", confirmPassword: "" }) // Clear the password inputs after successful submission
    } catch (err) {
      console.error('Password reset error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
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
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
          <CardDescription className="text-center">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
                required
                value={passwords.password}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                required
                value={passwords.confirmPassword}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full transition duration-200 ease-in-out transform hover:scale-105 h-fit text-[13px] py-[6px] px-[12px] shadow bg-gradient-to-t from-purple-700 to-purple-600 hover:bg-purple-400"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-4 text-center text-sm text-gray-600">
        Remember your password? <a href="/login" className="font-semibold text-purple-700">Log in</a>
      </div>
    </div>
  )
}