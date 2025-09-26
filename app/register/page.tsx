"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, Shield, Users, UserCheck, Info } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("student")
  const [staffRole, setStaffRole] = useState("")
  const [customRole, setCustomRole] = useState("")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0084ff]/10 via-[#4f46e5]/5 to-[#7c3aed]/10" />

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0084ff] to-[#4f46e5] flex items-center justify-center">
                <span className="text-white font-bold text-xl">CV</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-balance">Join CVHS Community Service</CardTitle>
            <CardDescription className="text-pretty">
              Create your account to start tracking service hours
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="staff" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Staff
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" className="bg-muted/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input id="student-id" placeholder="123456" className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduation-year">Graduation Year</Label>
                    <Select>
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue placeholder="Select your graduation year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                        <SelectItem value="2029">2029</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-email">School Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="jfal1234@stu.gusd.net"
                      className="bg-muted/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="student-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="bg-muted/50 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-[#0084ff] hover:bg-[#0070e6] text-white">Create Student Account</Button>
                </div>
              </TabsContent>

              <TabsContent value="staff" className="space-y-4">
                <Alert className="border-[#0084ff]/20 bg-[#0084ff]/5">
                  <Info className="h-4 w-4 text-[#0084ff]" />
                  <AlertDescription className="text-sm">
                    Staff registration requires approval from CVHS administration
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="staff-first-name">First Name</Label>
                      <Input id="staff-first-name" placeholder="Jane" className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff-last-name">Last Name</Label>
                      <Input id="staff-last-name" placeholder="Smith" className="bg-muted/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={staffRole} onValueChange={setStaffRole}>
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supervisor">Community Service Supervisor</SelectItem>
                        <SelectItem value="teacher">Teacher/Advisor</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {staffRole === "other" && (
                      <Input
                        id="custom-role"
                        placeholder="Please specify your role"
                        className="bg-muted/50 mt-2"
                        value={customRole}
                        onChange={e => setCustomRole(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="staff-email">Email</Label>
                    <Input id="staff-email" type="email" placeholder="jane.smith@abc123.com" className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="staff-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="staff-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="bg-muted/50 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="items-center space-y-2">
                    <Label htmlFor="verificaton-info">Verification Information</Label>
                    <Label htmlFor="verificaton-info">Please provide how we can verify your role. </Label>
                    <Input id="verificaton-info" type="info" placeholder="Ex: A website, professional website, LinkedIn, etc" className="bg-muted/50" />
                  </div>

                  <Button className="w-full bg-[#0084ff] hover:bg-[#0070e6] text-white">Request Staff Account</Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-[#0084ff] hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* School branding */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secure registration powered by CVHS ❤️</span>
          </div>
        </div>
      </div>
    </div>
  )
}
