"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, Award, LogOut } from "lucide-react"

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch user data from the backend
    // Simulate API call
    setTimeout(() => {
      setUser({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
        rewardPoints: 250,
        favoriteItems: [
          { id: "1", name: "Chicken Burger" },
          { id: "3", name: "Pepperoni Pizza" },
        ],
        monthlySpending: 149.97,
        orderCount: 7,
        rank: 2, // 2nd on the leaderboard
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Account</h1>
        <p>Loading account information...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Account</h1>
        <p>Please log in to view your account.</p>
        <Button className="mt-4">Log In</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="orders">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Link href="/account/orders">
                <Button variant="outline">View All Orders</Button>
              </Link>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold">Favorite Items</h2>
              <div className="space-y-2">
                {user.favoriteItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Link href={`/food/${item.id}`} className="hover:underline">
                      {item.name}
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold">Reward Points</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{user.rewardPoints}</p>
                      <p className="text-sm text-muted-foreground">Available Points</p>
                    </div>
                    <Button>Redeem Points</Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h3 className="font-medium">How to earn points</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Earn 10 points for every $1 spent</li>
                      <li>Bonus points for referring friends</li>
                      <li>Special promotions and events</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-xl font-semibold mt-6">Leaderboard Ranking</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">You're #{user.rank} on the monthly leaderboard!</p>
                      <p className="text-sm text-muted-foreground">
                        {user.orderCount} orders · ${user.monthlySpending.toFixed(2)} spent this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>

              <Separator />

              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-sm text-muted-foreground">{user.address}</p>
              </div>

              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
