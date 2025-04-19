"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export function AdminSettings() {
  const [primaryColor, setPrimaryColor] = useState("#0f172a")
  const [rewardPointsPerDollar, setRewardPointsPerDollar] = useState(10)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your restaurant settings and preferences.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Settings</CardTitle>
              <CardDescription>Customize your restaurant's brand appearance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input id="restaurant-name" defaultValue="Tasty Bites" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                </div>
                <p className="text-sm text-muted-foreground">This color will be used throughout the application.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input id="logo" type="file" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your restaurant's contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="contact@tastybites.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main St, New York, NY 10001" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reward System</CardTitle>
              <CardDescription>Configure your restaurant's reward system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rewards-active">Enable Rewards</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to earn and redeem reward points.</p>
                </div>
                <Switch id="rewards-active" defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="points-per-dollar">Points Per Dollar: {rewardPointsPerDollar}</Label>
                <Slider
                  id="points-per-dollar"
                  min={1}
                  max={20}
                  step={1}
                  defaultValue={[10]}
                  onValueChange={(value) => setRewardPointsPerDollar(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  Customers will earn {rewardPointsPerDollar} points for every $1 spent.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-redemption">Minimum Points for Redemption</Label>
                <Input id="min-redemption" type="number" defaultValue="100" />
                <p className="text-sm text-muted-foreground">
                  Minimum points required before customers can redeem rewards.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points-value">Points Value (in cents)</Label>
                <Input id="points-value" type="number" defaultValue="1" />
                <p className="text-sm text-muted-foreground">Value of each point in cents when redeemed.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Settings</CardTitle>
              <CardDescription>Configure the customer leaderboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="leaderboard-active">Enable Leaderboard</Label>
                  <p className="text-sm text-muted-foreground">Show monthly customer leaderboard.</p>
                </div>
                <Switch id="leaderboard-active" defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="leaderboard-reset">Leaderboard Reset</Label>
                <select
                  id="leaderboard-reset"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="top-customers">Number of Top Customers</Label>
                <Input id="top-customers" type="number" defaultValue="3" />
                <p className="text-sm text-muted-foreground">Number of top customers to display on the leaderboard.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-order">New Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new orders.</p>
                </div>
                <Switch id="new-order" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="order-status">Order Status Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when order status changes.</p>
                </div>
                <Switch id="order-status" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when items are low in stock.</p>
                </div>
                <Switch id="low-stock" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="customer-feedback">Customer Feedback</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new customer reviews.</p>
                </div>
                <Switch id="customer-feedback" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
