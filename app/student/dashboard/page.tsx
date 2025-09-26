"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Clock, CheckCircle, AlertCircle, TrendingUp, Calendar, Building2, Search, MoreHorizontal, Edit, Trash2, Eye, Download } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PageTransition } from "@/components/ui/page-transition"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { motion } from "framer-motion"

export default function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
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

// Mock data - in real app this would come from API
  const hoursData = [
    {
      id: 1,
      date: "2024-01-15",
      organization: "Local Food Bank",
      hours: 4.0,
      status: "approved",
      description: "Sorted donations and helped with food distribution",
      supervisor: "Jane Smith",
      approvedDate: "2024-01-16",
    },
    {
      id: 2,
      date: "2024-01-12",
      organization: "Animal Shelter",
      hours: 3.5,
      status: "pending",
      description: "Walked dogs and cleaned kennels",
      supervisor: "Mike Johnson",
      approvedDate: null,
    },
    {
      id: 3,
      date: "2024-01-10",
      organization: "Community Garden",
      hours: 2.0,
      status: "approved",
      description: "Planted vegetables and maintained garden beds",
      supervisor: "Sarah Wilson",
      approvedDate: "2024-01-11",
    },
    {
      id: 4,
      date: "2024-01-08",
      organization: "Senior Center",
      hours: 5.0,
      status: "rejected",
      description: "Helped with activities and meal service",
      supervisor: "Tom Brown",
      approvedDate: null,
      rejectionReason: "Insufficient documentation provided",
    },
    {
      id: 5,
      date: "2024-01-05",
      organization: "Library",
      hours: 3.0,
      status: "approved",
      description: "Organized books and helped with reading program",
      supervisor: "Lisa Davis",
      approvedDate: "2024-01-06",
    },
  ]

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

    const filteredData = hoursData.filter((entry) => {
    const matchesSearch =
      entry.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter
    return matchesSearch && matchesStatus
  })


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

          <Card>
          <CardHeader>
            <CardTitle>Service Hours Log</CardTitle>
            <CardDescription>All your community service entries and their approval status</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hours found</h3>
                <p className="text-muted-foreground mb-4 text-pretty">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Start logging your community service hours to see them here."}
                </p>
                <Button asChild className="bg-[#0084ff] hover:bg-[#0070e6] text-white">
                  <Link href="/student/hours/add">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Hours
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Supervisor</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{new Date(entry.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-balance">{entry.organization}</p>
                            <p className="text-sm text-muted-foreground text-pretty line-clamp-2">
                              {entry.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{entry.hours}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              entry.status === "approved"
                                ? "default"
                                : entry.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="capitalize"
                          >
                            {entry.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{entry.supervisor}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {entry.status === "pending" && (
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Entry
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </PageTransition>
    </AppShell>
  )
}
