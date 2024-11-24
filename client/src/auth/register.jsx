// https://www.dsf-smartdoc.com/
// https://www.dsf-smartdoc.com/register
// https://www.dsf-smartdoc.com/register
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FcGoogle } from "react-icons/fc"
import { Package, Gem, Building2 } from "lucide-react"
import microsoft from "@/Assets/images/microsoft.png"
import Logo from "@/Assets/images/logo.png"
import AuthAlert from "./authAlert"
import TermsAndConditions from "./termsAndConditions"
import { Dialog } from "@/components/ui/dialog"
import PrivacyPolicy from "./PrivacyPolicy"

const URL = "http://localhost:5000/api/v1"
const Production = "https://dsf-saas.onrender.com/api/v1"

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1)
  const [animationDirection, setAnimationDirection] = useState('forward')
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    privacyPolicayAccepted : false,
    membership: "basic"
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false)
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  const [activeOTP,setActiveOTP] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const navigate = useNavigate()

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("")
        setSuccessMessage("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, successMessage])

  const handlePrivacyAccept = () => {
    setFormData(prev => ({ ...prev, privacyPolicayAccepted: true }))
    setPrivacyDialogOpen(false)
  }

  const handleTermsAccept = () => {
    setFormData(prev => ({ ...prev, termsAccepted: true }))
    setTermsDialogOpen(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const goToNextStep = () => {
    setAnimationDirection('forward')
    setCurrentStep(step => step + 1)
  }

  const goToPreviousStep = () => {
    setAnimationDirection('backward')
    setCurrentStep(step => step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentStep < 3) {
      goToNextStep()
      return
    }
    
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    console.log(formData)

    try {
      const response = await fetch(`${Production}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name : `${formData.first_name} ${formData.last_name}`,
          first_name: formData.first_name,
          last_name: formData.last_name,
          company_name: formData.company_name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          membership: formData.membership,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.err || `HTTP error! status: ${response.status}`)
      }

      setSuccessMessage(data.message || 'Registration successful! Please Verify your Account')
      await new Promise((res) => setTimeout(res, 3000))
      setResendTimer(60)
      setActiveOTP(true)

    } catch (err) {
      console.error('Registration error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    const otpString = otp.join("")

    console.log({ email : formData.email , otp: otpString })
    try {
      const response = await fetch(`${Production}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email : formData.email , otp: otpString }),
      })

      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        throw new Error(data.err || 'Failed to verify OTP')
      }

      setSuccessMessage('OTP verified successfully!')
      await new Promise((res) => setTimeout(res,3000))
      window.location.href = "https://smt-omega.vercel.app/login"
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
        body: JSON.stringify({ email : formData.email }),
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

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <Dialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen}>
        <TermsAndConditions handleTermsAccept={handleTermsAccept} />
      </Dialog>
      <Dialog open={privacyDialogOpen} onOpenChange={setPrivacyDialogOpen}>
        <PrivacyPolicy handlePrivacyAccept={handlePrivacyAccept} />
      </Dialog>
      <div className="w-full max-w-md fixed top-4 z-50 px-4">
        {error && (
          <AuthAlert
            title={"Error"}
            successMessage={error}
            mainClr={"bg-red-100"}
            childclr={"border-red-400"}
            text={"text-red-800"}
            variant={"destructive"}
          />
        )}
        {successMessage && (
          <AuthAlert
            title={"Success"}
            successMessage={successMessage}
            mainClr={"bg-green-100"}
            childclr={"border-green-400"}
            text={"text-green-800"}
            variant={"default"}
          />
        )}
      </div>
      {!activeOTP ? (
        <div className="bg-muted rounded-lg shadow-xl my-16 w-full sm:max-w-[500px] sm:min-w-[500px]">
          <Card className="w-full shadow-none m-0">
            <CardHeader className="space-y-1">
              <img src={Logo} alt="logo" className="w-12 mx-auto" />
              <CardTitle className="text-[17px] font-Poppins font-bold tracking-tight text-center">
                {currentStep === 1
                  ? "Create an account"
                  : currentStep === 2
                  ? "Personal Information"
                  : "Choose Membership"}
              </CardTitle>
              <CardDescription className="text-center text-[13px]">
                {currentStep === 1
                  ? "Please fill in your account details."
                  : currentStep === 2
                  ? "Tell us more about yourself."
                  : "Select your preferred membership plan."}
              </CardDescription>
              <div className="flex justify-between mt-4">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-1/3 h-1 rounded-full transition-all duration-300 mt-2 ${
                      step <= currentStep ? "bg-gray-600" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </CardHeader>
            {/* <div className="flex gap-3 items-center w-full px-6 mt-">
              <Button
                type="button"
                className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 h-fit text-[13px] py-[6px] px-[12px] shadow"
              >
                <FcGoogle className="mr-2 w-[1rem] h-[1rem]" /> Google
              </Button>
              <Button
                type="button"
                className="w-full bg-[#2F2F2F] hover:bg-[#1E1E1E] text-white h-fit py-[6px] px-[12px] !m-0 text-[13px]"
              >
                <img
                  src={microsoft}
                  alt="Microsoft logo"
                  className="mr-2 w-[1rem] h-[1rem]"
                />{" "}
                Microsoft
              </Button>
            </div> */}
            {/* <div className="flex items-center my-4 w-full px-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500 text-[15px]">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div> */}
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-3 overflow-hidden">
                <div
                  className={`transition-all duration-300 ease-in-out transform ${
                    animationDirection === "forward"
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0"
                  }`}
                >
                  {currentStep === 1 && (
                    <>
                      <div className="space-y-1">
                        <Label
                          htmlFor="email"
                          className="text-[13px] font-Exo-2"
                        >
                          Email address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primary py-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px]"
                          placeholder="JohnDoe@gmail.com"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="password"
                          className="text-[13px] font-Exo-2"
                        >
                          Password
                        </Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primary py-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-[13px] font-Exo-2"
                        >
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primary py-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px]"
                        />
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              termsAccepted: checked,
                            }))
                          }
                        />
                        <Label className="text-[13px]">
                          I accept the{" "}
                          <span
                            className="underline cursor-pointer text-primary"
                            onClick={() => setTermsDialogOpen(true)}
                          >
                            Terms and Conditions
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          checked={formData.privacyPolicayAccepted}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              privacyPolicayAccepted: checked,
                            }))
                          }
                        />
                        <Label className="text-[13px]">
                          I accept the{" "}
                          <span
                            className="underline cursor-pointer text-primary"
                            onClick={() => setPrivacyDialogOpen(true)}
                          >
                            Privacy Policy
                          </span>
                        </Label>
                      </div>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label
                            htmlFor="first_name"
                            className="text-[13px] font-Exo-2"
                          >
                            First Name
                          </Label>
                          <Input
                            id="first_name"
                            name="first_name"
                            type="text"
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                            className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primary py-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px]"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor="last_name"
                            className="text-[13px] font-Exo-2"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="last_name"
                            name="last_name"
                            type="text"
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                            className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primary py-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px]"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="company_name"
                          className="text-[13px] font-Exo-2"
                        >
                          Company Name
                        </Label>
                        <Input
                          id="company_name"
                          name="company_name"
                          type="text"
                          value={formData.company_name}
                          onChange={handleChange}
                          className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primary py-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px]"
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="phone"
                          className="text-[13px] font-Exo-2"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="transition duration-200 ease-in-out focus:ring-2 focus:ring-primary py-[0.375rem] px-[0.75rem] max-h-[2.25rem] text-[13px]"
                          placeholder="+01-542-4587"
                        />
                      </div>
                    </>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <Label className="text-[15px] font-semibold">
                        Choose your membership
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.membership === "basic"
                              ? "border-gray-600 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              membership: "basic",
                            }))
                          }
                        >
                          <div className="flex items-center justify-center mb-2">
                            <Package className="w-8 h-8 text-gray-600" />
                          </div>
                          <h3 className="text-center font-semibold">Basic</h3>
                          <p className="text-center text-sm text-gray-500">
                            For individuals
                          </p>
                        </div>
                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.membership === "pro"
                              ? "border-gray-600 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              membership: "pro",
                            }))
                          }
                        >
                          <div className="flex items-center justify-center mb-2">
                            <Gem className="w-8 h-8 text-gray-600" />
                          </div>
                          <h3 className="text-center font-semibold">Pro</h3>
                          <p className="text-center text-sm text-gray-500">
                            For professionals
                          </p>
                        </div>
                        {/* <div
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.membership === "enterprise"
                              ? "border-gray-600 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              membership: "enterprise",
                            }))
                          }
                        >
                          <div className="flex items-center justify-center mb-2">
                            <Building2 className="w-8 h-8 text-gray-600" />
                          </div>
                          <h3 className="text-center font-semibold">
                            Enterprise
                          </h3>
                          <p className="text-center text-sm text-gray-500">
                            For large teams
                          </p>
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {/* Removed Back button */}
                <Button
                  type="submit"
                  className="w-full transition duration-200 ease-in-out transform hover:scale-105 h-fit text-[13px] py-[6px] px-[12px] shadow bg-gradient-to-t from-gray-700 to-gray-600 hover:bg-gray-400"
                  disabled={
                    isLoading ||
                    (currentStep === 1 &&
                      (!formData.email ||
                        !formData.password ||
                        !formData.confirmPassword ||
                        !formData.termsAccepted ||
                        !formData.privacyPolicayAccepted ||
                        formData.password !== formData.confirmPassword ||
                        formData.password.length <= 8))
                  }
                >
                  {isLoading
                    ? "Processing..."
                    : currentStep < 3
                    ? "Continue"
                    : "Register"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          <div className="flex justify-center gap-1.5 items-center py-4 text-[13px] text-muted-foreground">
            <p>Already have an account?</p>
            <a href="/login" className="font-semibold text-gray-700">
              Sign in
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-muted rounded-lg shadow-xl">
          <Card className="w-full max-w-md shadow-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-[17px] font-Poppins font-bold tracking-tight text-center">
                OTP Verification
              </CardTitle>
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
                  disabled={isLoading || otp.some((digit) => digit === "")}
                  onClick={handleOTPSubmit}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-fit text-[13px] py-[6px] px-[12px]"
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0}
                >
                  {resendTimer > 0
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}