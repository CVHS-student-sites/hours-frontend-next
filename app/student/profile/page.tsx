"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Save, Shield, Smartphone, Monitor } from "lucide-react"

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  // Mock student data
  const studentData = {
    name: "John Doe",
    email: "john.doe@student.cvhs.edu",
    studentId: "123456",
    grade: "11",
    graduationYear: "2025",
    totalHours: 45.5,
    requiredHours: 60,
    joinDate: "2023-09-01",
  }

  const sessions = [
    {
      device: "iPhone 14",
      location: "San Francisco, CA",
      lastActive: "Active now",
      current: true,
    },
    {
      device: "Chrome on MacBook",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
  ]

  return (
    <AppShell showBottomTabs userRole="student">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <PageHeader title="Profile Settings" subtitle="Manage your account information and preferences" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic account details and school information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt={studentData.name} />
                      <AvatarFallback className="bg-[#0084ff] text-white text-xl">
                        {studentData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{studentData.name}</h3>
                    <p className="text-muted-foreground">{studentData.email}</p>
                    <Badge variant="secondary" className="mt-1">
                      Grade {studentData.grade} • Class of {studentData.graduationYear}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Editable Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      defaultValue="John"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted/50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      defaultValue="Doe"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted/50" : ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input id="student-id" defaultValue={studentData.studentId} disabled className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade Level</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger className={!isEditing ? "bg-muted/50" : ""}>
                        <SelectValue placeholder={`Grade ${studentData.grade}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">9th Grade</SelectItem>
                        <SelectItem value="10">10th Grade</SelectItem>
                        <SelectItem value="11">11th Grade</SelectItem>
                        <SelectItem value="12">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">School Email</Label>
                  <Input id="email" type="email" defaultValue={studentData.email} disabled className="bg-muted/50" />
                  <p className="text-xs text-muted-foreground">
                    Contact your school administrator to change your email address
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-[#0084ff] hover:bg-[#0070e6] text-white">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about hour approvals and reminders</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme for better viewing in low light</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Hours Completed</span>
                      <span>
                        {studentData.totalHours} / {studentData.requiredHours}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-[#0084ff] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(studentData.totalHours / studentData.requiredHours) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#0084ff]">
                      {Math.round((studentData.totalHours / studentData.requiredHours) * 100)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Active Sessions</h4>
                  <div className="space-y-3">
                    {sessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          {session.device.includes("iPhone") ? (
                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium">{session.device}</p>
                            <p className="text-muted-foreground text-xs">{session.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={session.current ? "text-green-500" : "text-muted-foreground"}>
                            {session.lastActive}
                          </p>
                          {session.current && (
                            <Badge variant="secondary" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span>{new Date(studentData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID</span>
                  <span>{studentData.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Graduation Year</span>
                  <span>{studentData.graduationYear}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
