"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OtpVerificationProps {
  phoneNumber: string
  onVerificationSuccess: () => void
  onCancel: () => void
}

export function OtpVerification({ phoneNumber, onVerificationSuccess, onCancel }: OtpVerificationProps) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    setError("")

    // In a real app, this would verify the OTP with the backend
    // For demo purposes, we'll simulate a successful verification after a delay
    setTimeout(() => {
      setIsLoading(false)

      // For demo, any 6-digit code is accepted
      if (otp.length === 6) {
        onVerificationSuccess()
      } else {
        setError("Invalid verification code. Please try again.")
      }
    }, 1500)
  }

  const handleResendOtp = () => {
    // In a real app, this would request a new OTP from the backend
    alert(`New OTP sent to ${phoneNumber}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phone Verification</CardTitle>
        <CardDescription>We've sent a verification code to {phoneNumber}. Please enter it below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
            maxLength={6}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <Button variant="link" className="p-0 h-auto" onClick={handleResendOtp}>
          Didn't receive a code? Resend
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Back
        </Button>
        <Button onClick={handleVerify} disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </CardFooter>
    </Card>
  )
}
