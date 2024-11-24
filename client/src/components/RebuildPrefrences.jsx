

import { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Brain, Wrench, ChevronLeft, ChevronRight, SkipForward, Mail, Code, FileUp } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { AppContext } from '@/context/AppContext'
import { steps } from '@/hooks/utils/data'


export default function RebuildPrefrences({onPostRequest,BtnContent,BtnColor}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState({
    'SmartDocProcessors': [],
    'GenAi': [],
    'Conversions': [],
    'ImportsMethods': [],
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { auth } = useContext(AppContext)
  const { token } = auth


  const handleOptionToggle = (option) => {
    setPreferences(prev => {
      const currentStepKey = steps[currentStep].backendKey
      const updatedOptions = prev[currentStepKey].some(item => item.name === option.name)
        ? prev[currentStepKey].filter(item => item.name !== option.name)
        : [...prev[currentStepKey], option]
      return { ...prev, [currentStepKey]: updatedOptions }
    })
  }

  const URL = "http://localhost:5000/api/v1"
  const Production = "https://dsf-saas.onrender.com/api/v1"

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsLoading(true)
      try {
        const response = await fetch(`${Production}/preferences`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(preferences),
        })
        if (!response.ok) {
          throw new Error('Failed to save preferences')
        }

        const data = await response.json()
        // console.log('Preferences saved:', data)
        toast({
          title: "Success",
          description: "Your preferences have been saved.",
        })
        setIsOpen(false)
        onPostRequest()
      } catch (error) {
        console.error('Error saving preferences:', error)
        toast({
          title: "Error",
          description: "Failed to save preferences. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsOpen(false)
    }
  }

  const StepIcon = steps[currentStep].icon

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="">
      <DialogTrigger asChild>
        <Button className={`${BtnColor}`}> {BtnContent} </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] bg-gray-50">
        <Card className="w-full border-0 shadow-none bg-transparent ">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <StepIcon className="h-6 w-6 text-gray-500" />
              <CardTitle className="text-2xl font-bold">{steps[currentStep].name} Preferences</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground text-center">Step {currentStep + 1} of {steps.length}</p>
          </CardHeader>
          <CardContent>
            <Progress value={(currentStep + 1) / steps.length * 100} className="mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps[currentStep].options.map((option) => (
                <Card 
                  key={option.name} 
                  className={`cursor-pointer transition-all ${
                    preferences[steps[currentStep].backendKey].some(item => item.name === option.name)
                      ? 'ring-2 ring-gray-400 shadow-md'
                      : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                  onClick={() => handleOptionToggle(option)}
                >
                  <CardContent className="p-4 flex items-start space-x-4">
                    {option.icon ? <option.icon className="h-5 w-5 mt-1 text-gray-700" /> : <StepIcon className="h-5 w-5 mt-1 text-gray-700" />}
                    <div>
                      <h3 className="font-semibold text-gray-800">{option.name}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          <div className="flex justify-between p-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} 
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="flex gap-3">
              <Button onClick={handleNext} disabled={isLoading}>
                {currentStep === steps.length - 1 ? (isLoading ? 'Saving...' : 'Save and Continue') : 'Next'} 
                {currentStep < steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
              <Button variant="outline" onClick={handleSkip} disabled={isLoading}>
                <SkipForward className="mr-2 h-4 w-4" /> Skip
              </Button>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  )
}