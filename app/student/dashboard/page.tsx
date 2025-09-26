"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Clock, CheckCircle, AlertCircle, TrendingUp, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/ui/page-transition"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { motion } from "framer-motion"

export default function StudentDashboard() {
  // Mock data - in real app this would come from API
  const studentData = {
    name: "John Doe",
    grade: "11th Grade",
    totalHours: 45.5,
    pendingHours: 8.0,
    thisMonth: 12.5,
    organizations: 3,
    requiredHours: 60,
  }

  const recentActivity = [
    {
      id: 1,
      organization: "Local Food Bank",
      hours: 4.0,
      date: "2024-01-15",
      status: "approved",
      description: "Sorted donations and helped with food distribution",
    },
    {
      id: 2,
      organization: "Animal Shelter",
      hours: 3.5,
      date: "2024-01-12",
      status: "pending",
      description: "Walked dogs and cleaned kennels",
    },
    {
      id: 3,
      organization: "Community Garden",
      hours: 2.0,
      date: "2024-01-10",
      status: "approved",
      description: "Planted vegetables and maintained garden beds",
    },
  ]

  const progressPercentage = (studentData.totalHours / studentData.requiredHours) * 100

  return (
    <AppShell showBottomTabs userRole="student">
      <PageTransition>
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Hero Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GradientCard variant="hero" className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt={studentData.name} />
                      <AvatarFallback className="bg-[#0084ff] text-white text-lg">
                        {studentData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold text-balance">Welcome back, {studentData.name}!</h1>
                    <p className="text-muted-foreground">{studentData.grade} • CVHS Student</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild className="bg-[#0084ff] hover:bg-[#0070e6] text-white">
                    <Link href="/student/hours/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Hours
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </GradientCard>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GradientCard variant="stat" className="p-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[#0084ff]">
                        <AnimatedCounter value={studentData.totalHours} />
                      </div>
                      <p className="text-xs text-muted-foreground">of {studentData.requiredHours} required</p>
                    </div>
                    <Clock className="h-8 w-8 text-[#0084ff]/60" />
                  </div>
                  <div className="mt-3 w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-[#0084ff] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                  </div>
                </CardContent>
              </GradientCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">
                        <AnimatedCounter value={studentData.pendingHours} />
                      </div>
                      <p className="text-xs text-muted-foreground">hours waiting</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-orange-500/60" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">
                        <AnimatedCounter value={studentData.thisMonth} />
                      </div>
                      <p className="text-xs text-muted-foreground">hours logged</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500/60" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Organizations</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">
                        <AnimatedCounter value={studentData.organizations} />
                      </div>
                      <p className="text-xs text-muted-foreground">volunteered with</p>
                    </div>
                    <Building2 className="h-8 w-8 text-purple-500/60" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest community service entries</CardDescription>
                </div>
                <Button asChild variant="outline">
                  <Link href="/student/hours">View All Hours</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card/50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {activity.status === "approved" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-balance">{activity.organization}</p>
                          <p className="text-sm text-muted-foreground text-pretty">{activity.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(activity.date).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {activity.hours} hours
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={activity.status === "approved" ? "default" : "secondary"} className="capitalize">
                        {activity.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
