"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trophy, Gift, Award } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function AdminRewards() {
  const [rewardSettings, setRewardSettings] = useState({
    pointsPerDollar: 10,
    minRedemption: 100,
    pointsValueInCents: 1,
    enableLeaderboard: true,
    leaderboardReset: "monthly",
    topCustomersCount: 3,
  })

  const [topCustomers, setTopCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [giftDialog, setGiftDialog] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [giftPoints, setGiftPoints] = useState(0)
  const [giftNote, setGiftNote] = useState("")

  useEffect(() => {
    // In a real app, this would fetch top customers from the backend
    // Simulate API call
    setTimeout(() => {
      setTopCustomers([
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          orders: 12,
          spent: 349.45,
          rewardPoints: 250,
          rank: 1,
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.johnson@example.com",
          phone: "+1 (555) 234-5678",
          orders: 8,
          spent: 245.99,
          rewardPoints: 180,
          rank: 2,
        },
        {
          id: "3",
          name: "Michael Smith",
          email: "michael.smith@example.com",
          phone: "+1 (555) 345-6789",
          orders: 7,
          spent: 199.5,
          rewardPoints: 150,
          rank: 3,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleSettingsChange = (name, value) => {
    setRewardSettings({
      ...rewardSettings,
      [name]: value,
    })
  }

  const handleSaveSettings = () => {
    // In a real app, this would call an API to save the settings
    alert("Reward settings saved successfully!")
  }

  const handleGiftPoints = (customer) => {
    setSelectedCustomer(customer)
    setGiftPoints(0)
    setGiftNote("")
    setGiftDialog(true)
  }

  const confirmGiftPoints = () => {
    // In a real app, this would call an API to gift points to the customer
    const updatedCustomers = topCustomers.map((customer) => {
      if (customer.id === selectedCustomer.id) {
        return {
          ...customer,
          rewardPoints: customer.rewardPoints + Number.parseInt(giftPoints),
        }
      }
      return customer
    })

    setTopCustomers(updatedCustomers)
    setGiftDialog(false)
    setSelectedCustomer(null)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="settings">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="settings">Reward Settings</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4 pt-4">
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
                <Switch id="rewards-active" checked={true} onCheckedChange={() => {}} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="points-per-dollar">Points Per Dollar: {rewardSettings.pointsPerDollar}</Label>
                <Slider
                  id="points-per-dollar"
                  min={1}
                  max={20}
                  step={1}
                  value={[rewardSettings.pointsPerDollar]}
                  onValueChange={(value) => handleSettingsChange("pointsPerDollar", value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  Customers will earn {rewardSettings.pointsPerDollar} points for every $1 spent.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-redemption">Minimum Points for Redemption</Label>
                <Input
                  id="min-redemption"
                  type="number"
                  value={rewardSettings.minRedemption}
                  onChange={(e) => handleSettingsChange("minRedemption", Number.parseInt(e.target.value))}
                />
                <p className="text-sm text-muted-foreground">
                  Minimum points required before customers can redeem rewards.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points-value">Points Value (in cents)</Label>
                <Input
                  id="points-value"
                  type="number"
                  value={rewardSettings.pointsValueInCents}
                  onChange={(e) => handleSettingsChange("pointsValueInCents", Number.parseInt(e.target.value))}
                />
                <p className="text-sm text-muted-foreground">Value of each point in cents when redeemed.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
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
                <Switch
                  id="leaderboard-active"
                  checked={rewardSettings.enableLeaderboard}
                  onCheckedChange={(checked) => handleSettingsChange("enableLeaderboard", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="leaderboard-reset">Leaderboard Reset</Label>
                <select
                  id="leaderboard-reset"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={rewardSettings.leaderboardReset}
                  onChange={(e) => handleSettingsChange("leaderboardReset", e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="top-customers">Number of Top Customers</Label>
                <Input
                  id="top-customers"
                  type="number"
                  value={rewardSettings.topCustomersCount}
                  onChange={(e) => handleSettingsChange("topCustomersCount", Number.parseInt(e.target.value))}
                />
                <p className="text-sm text-muted-foreground">Number of top customers to display on the leaderboard.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Leaderboard</CardTitle>
              <CardDescription>Top customers for the current month based on order count and spending.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading leaderboard...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Reward Points</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {customer.rank === 1 ? (
                              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                            ) : customer.rank === 2 ? (
                              <Trophy className="h-5 w-5 mr-2 text-gray-400" />
                            ) : customer.rank === 3 ? (
                              <Trophy className="h-5 w-5 mr-2 text-amber-700" />
                            ) : (
                              <span className="w-5 mr-2 text-center">{customer.rank}</span>
                            )}
                            <Badge>
                              {customer.rank === 1
                                ? "1st"
                                : customer.rank === 2
                                  ? "2nd"
                                  : customer.rank === 3
                                    ? "3rd"
                                    : `${customer.rank}th`}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">{customer.email}</div>
                        </TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>${customer.spent.toFixed(2)}</TableCell>
                        <TableCell>{customer.rewardPoints}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleGiftPoints(customer)}>
                            <Gift className="h-4 w-4 mr-2" />
                            Gift Points
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Rewards</CardTitle>
              <CardDescription>Reward your top customers at the end of each month.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                      1st Place
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Reward Points:</span>
                        <span className="font-medium">500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Free Items:</span>
                        <span className="font-medium">Any 2 items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Discount:</span>
                        <span className="font-medium">20% off next order</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-gray-400" />
                      2nd Place
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Reward Points:</span>
                        <span className="font-medium">300</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Free Items:</span>
                        <span className="font-medium">Any 1 item</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Discount:</span>
                        <span className="font-medium">15% off next order</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-amber-700" />
                      3rd Place
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Reward Points:</span>
                        <span className="font-medium">200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Free Items:</span>
                        <span className="font-medium">Any dessert</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Discount:</span>
                        <span className="font-medium">10% off next order</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-4">
                <Button>
                  <Award className="mr-2 h-4 w-4" />
                  Distribute Monthly Rewards
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={giftDialog} onOpenChange={setGiftDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gift Reward Points</DialogTitle>
            <DialogDescription>
              Gift reward points to {selectedCustomer?.name} for being a top customer.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="gift-points">Points to Gift</Label>
              <Input
                id="gift-points"
                type="number"
                min="0"
                value={giftPoints}
                onChange={(e) => setGiftPoints(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">Current points: {selectedCustomer?.rewardPoints || 0}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-note">Note (optional)</Label>
              <Input
                id="gift-note"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="e.g. Monthly leaderboard reward"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGiftDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmGiftPoints} disabled={!giftPoints || giftPoints <= 0}>
              Gift Points
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
