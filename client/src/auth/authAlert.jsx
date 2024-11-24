

import React from 'react'
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthAlert({title,successMessage,error,mainClr,childclr,variant,text}) {
  return (
    <Alert variant={variant} className={`${mainClr} ${childclr} ${text} animate-in fade-in-50 slide-in-from-top-full duration-300`}>
        {
            successMessage ? (
                <CheckCircle2 className="h-4 w-4" /> 
            ) : (
                <AlertCircle className="h-4 w-4" /> 
            )

        }
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{error || successMessage}</AlertDescription>
    </Alert>
  )
}
