"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OtpVerification } from "@/components/otp-verification"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  // Shipping fee and tax calculation
  const shippingFee = 2.99
  const taxRate = 0.08 // 8%
  const tax = subtotal * taxRate
  const total = subtotal + shippingFee + tax

  const handlePlaceOrder = () => {
    if (!isVerified) {
      setShowOtpVerification(true)
    } else {
      // In a real app, this would submit the order to the backend
      alert("Order placed successfully!")
      clearCart()
      router.push("/account/orders")
    }
  }

  const handleVerificationSuccess = () => {
    setIsVerified(true)
    setShowOtpVerification(false)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Add items to your cart to proceed to checkout.</p>
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {showOtpVerification ? (
            <OtpVerification
              phoneNumber={phoneNumber}
              onVerificationSuccess={handleVerificationSuccess}
              onCancel={() => setShowOtpVerification(false)}
            />
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>We'll use this information to contact you about your order.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll send a verification code to this number before completing your order.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="NY" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="United States" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="payment" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="payment" onClick={() => setPaymentMethod("cash")}>
                        Cash on Delivery
                      </TabsTrigger>
                      <TabsTrigger value="online" onClick={() => setPaymentMethod("online")}>
                        Online Payment
                      </TabsTrigger>
                      <TabsTrigger value="manual" onClick={() => setPaymentMethod("manual")}>
                        Manual Payment
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="payment" className="space-y-4 pt-4">
                      <p>Pay with cash when your order is delivered.</p>
                    </TabsContent>
                    <TabsContent value="online" className="space-y-4 pt-4">
                      <p>Pay securely online with SSLCommerz.</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input id="card-name" placeholder="John Doe" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="manual" className="space-y-4 pt-4">
                      <p>Make a payment via bKash and provide the transaction ID below.</p>
                      <div className="space-y-2">
                        <Label htmlFor="transaction-id">Transaction ID</Label>
                        <Input id="transaction-id" placeholder="bKash Transaction ID" />
                      </div>
                      <p className="text-sm text-muted-foreground">Send payment to: 01712345678 (bKash)</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.variantId}`} className="flex justify-between">
                  <div>
                    <p>
                      {item.name} {item.variantName ? `(${item.variantName})` : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>${shippingFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                {isVerified ? "Place Order" : "Verify & Place Order"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
