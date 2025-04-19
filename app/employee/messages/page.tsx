"use client"

import { useState } from "react"
import { EmployeeSidebar } from "@/components/employee-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, Plus, Phone, Video } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function EmployeeMessagesPage() {
  const [activeTab, setActiveTab] = useState("team")
  const [activeChat, setActiveChat] = useState("chat1")
  const [messageInput, setMessageInput] = useState("")

  // Sample contacts data
  const teamContacts = [
    {
      id: "chat1",
      name: "John Manager",
      role: "Restaurant Manager",
      avatar: "/placeholder.svg?height=40&width=40&text=JM",
      lastMessage: "Please check the inventory report",
      time: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: "chat2",
      name: "Sarah Supervisor",
      role: "Shift Supervisor",
      avatar: "/placeholder.svg?height=40&width=40&text=SS",
      lastMessage: "Your shift has been updated for next week",
      time: "Yesterday",
      unread: 0,
      online: true,
    },
    {
      id: "chat3",
      name: "Kitchen Team",
      role: "Group Chat",
      avatar: "/placeholder.svg?height=40&width=40&text=KT",
      lastMessage: "New menu items training at 3 PM",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
  ]

  const customerContacts = [
    {
      id: "chat4",
      name: "Michael Smith",
      role: "Customer",
      avatar: "/placeholder.svg?height=40&width=40&text=MS",
      lastMessage: "Is my order #1234 ready for pickup?",
      time: "2:15 PM",
      unread: 1,
      online: false,
    },
    {
      id: "chat5",
      name: "Emily Wilson",
      role: "Customer",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      lastMessage: "Thanks for the great service!",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
  ]

  // Sample messages for active chat
  const messages = [
    {
      id: 1,
      sender: "John Manager",
      avatar: "/placeholder.svg?height=40&width=40&text=JM",
      content: "Good morning! How's your shift going today?",
      time: "10:15 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Morning! It's going well. We're a bit busy with the breakfast rush.",
      time: "10:18 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "John Manager",
      avatar: "/placeholder.svg?height=40&width=40&text=JM",
      content:
        "Great to hear. Please check the inventory report when you get a chance. We need to place orders for next week.",
      time: "10:20 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "John Manager",
      avatar: "/placeholder.svg?height=40&width=40&text=JM",
      content: "Also, can you cover Sarah's shift tomorrow morning? She called in sick.",
      time: "10:30 AM",
      isMe: false,
    },
  ]

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return
    // In a real app, this would send the message to the backend
    console.log("Sending message:", messageInput)
    setMessageInput("")
  }

  const getContacts = () => {
    return activeTab === "team" ? teamContacts : customerContacts
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <EmployeeSidebar activeTab="messages" />

        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold">Messages</h1>
            </div>
          </header>

          <main className="flex flex-1 flex-col">
            <div className="grid h-[calc(100vh-4rem)] grid-cols-1 md:grid-cols-[300px_1fr]">
              {/* Contacts sidebar */}
              <div className="border-r">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search messages..." className="pl-8" />
                  </div>
                </div>

                <Tabs defaultValue="team" value={activeTab} onValueChange={setActiveTab}>
                  <div className="px-4 pt-4">
                    <TabsList className="w-full">
                      <TabsTrigger value="team" className="flex-1">
                        Team
                      </TabsTrigger>
                      <TabsTrigger value="customers" className="flex-1">
                        Customers
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value={activeTab} className="mt-0">
                    <ScrollArea className="h-[calc(100vh-12rem)]">
                      <div className="p-4 space-y-2">
                        {getContacts().map((contact) => (
                          <div
                            key={contact.id}
                            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${activeChat === contact.id ? "bg-muted" : ""}`}
                            onClick={() => setActiveChat(contact.id)}
                          >
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                              </Avatar>
                              {contact.online && (
                                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-xs text-muted-foreground">{contact.time}</div>
                              </div>
                              <div className="text-xs text-muted-foreground">{contact.role}</div>
                              <div className="text-sm truncate mt-1">{contact.lastMessage}</div>
                            </div>
                            {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Chat area */}
              <div className="flex flex-col">
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=JM" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">John Manager</div>
                      <div className="text-xs text-muted-foreground">Restaurant Manager • Online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-3 max-w-[80%] ${message.isMe ? "flex-row-reverse" : ""}`}>
                          {!message.isMe && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{getInitials(message.sender)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div
                              className={`rounded-lg p-3 ${message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                            >
                              {message.content}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              {message.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
