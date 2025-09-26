"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Users, Clock, AlertTriangle, CheckCircle, Server, Shield, Activity, UserCheck, Building2 } from "lucide-react"

export default function AdminOverview() {
  // Mock system data
  const systemHealth = {
    status: "healthy",
    uptime: "99.9%",
    totalUsers: 1247,
    activeUsers: 89,
    totalHours: 15678,
    pendingApprovals: 23,
    supervisors: 12,
    organizations: 8,
  }

  const systemMetrics = [
    { time: "00:00", users: 45, requests: 120 },
    { time: "04:00", users: 23, requests: 80 },
    { time: "08:00", users: 67, requests: 200 },
    { time: "12:00", users: 89, requests: 350 },
    { time: "16:00", users: 78, requests: 280 },
    { time: "20:00", users: 56, requests: 180 },
  ]

  const hoursByMonth = [
    { month: "Sep", hours: 1200 },
    { month: "Oct", hours: 1450 },
    { month: "Nov", hours: 1100 },
    { month: "Dec", hours: 1300 },
    { month: "Jan", hours: 1678 },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "user_registered",
      user: "John Doe",
      description: "New student registered",
      timestamp: "2 minutes ago",
      severity: "info",
    },
    {
      id: 2,
      type: "hours_approved",
      user: "Jane Smith",
      description: "Approved 4.5 hours for Sarah Wilson",
      timestamp: "5 minutes ago",
      severity: "success",
    },
    {
      id: 3,
      type: "system_alert",
      user: "System",
      description: "High approval queue detected",
      timestamp: "10 minutes ago",
      severity: "warning",
    },
    {
      id: 4,
      type: "supervisor_added",
      user: "Admin",
      description: "Added new supervisor: Mike Johnson",
      timestamp: "1 hour ago",
      severity: "info",
    },
  ]

  const flaggedEntries = [
    {
      id: 1,
      student: "Alex Chen",
      hours: 12.0,
      reason: "Unusually high hours for single day",
      supervisor: "Jane Smith",
      date: "2024-01-15",
    },
    {
      id: 2,
      student: "Emma Davis",
      hours: 8.0,
      reason: "Duplicate submission detected",
      supervisor: "Mike Johnson",
      date: "2024-01-14",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-600 dark:text-green-400"
      case "warning":
        return "text-orange-600 dark:text-orange-400"
      case "error":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-blue-600 dark:text-blue-400"
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "user_registered":
        return <Users className="h-4 w-4" />
      case "hours_approved":
        return <CheckCircle className="h-4 w-4" />
      case "system_alert":
        return <AlertTriangle className="h-4 w-4" />
      case "supervisor_added":
        return <UserCheck className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <AppShell showBottomTabs userRole="admin">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <GradientCard variant="hero" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-balance">System Overview</h1>
                <p className="text-muted-foreground">CVHS Community Service Hours Administration</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={systemHealth.status === "healthy" ? "default" : "destructive"}
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  <Server className="mr-1 h-3 w-3" />
                  System {systemHealth.status}
                </Badge>
                <Badge variant="secondary">Uptime: {systemHealth.uptime}</Badge>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* System Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GradientCard variant="stat" className="p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-[#0084ff]">{systemHealth.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{systemHealth.activeUsers} active now</p>
                </div>
                <Users className="h-8 w-8 text-[#0084ff]/60" />
              </div>
            </CardContent>
          </GradientCard>

          <Card className="p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{systemHealth.totalHours.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">community service</p>
                </div>
                <Clock className="h-8 w-8 text-green-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-orange-500">{systemHealth.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">awaiting review</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Supervisors</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{systemHealth.supervisors}</div>
                  <p className="text-xs text-muted-foreground">{systemHealth.organizations} organizations</p>
                </div>
                <Building2 className="h-8 w-8 text-purple-500/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* System Activity */}
          <Card>
            <CardHeader>
              <CardTitle>System Activity (24h)</CardTitle>
              <CardDescription>Active users and API requests over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={systemMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#0084ff" strokeWidth={2} name="Active Users" />
                  <Line type="monotone" dataKey="requests" stroke="#4f46e5" strokeWidth={2} name="API Requests" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hours by Month */}
          <Card>
            <CardHeader>
              <CardTitle>Service Hours Trend</CardTitle>
              <CardDescription>Total hours logged per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hoursByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#0084ff" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className={`mt-0.5 ${getSeverityColor(activity.severity)}`}>
                      {getSeverityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-balance">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Flagged Entries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-500" />
                Flagged Entries
              </CardTitle>
              <CardDescription>Entries requiring administrative review</CardDescription>
            </CardHeader>
            <CardContent>
              {flaggedEntries.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <p className="text-muted-foreground">No flagged entries at this time</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {flaggedEntries.map((entry) => (
                    <Alert
                      key={entry.id}
                      className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950"
                    >
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-orange-800 dark:text-orange-200">{entry.student}</p>
                            <p className="text-sm text-orange-600 dark:text-orange-400">{entry.reason}</p>
                            <p className="text-xs text-orange-500 dark:text-orange-500 mt-1">
                              {entry.hours}h • {entry.supervisor} • {new Date(entry.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-300 text-orange-700 bg-transparent"
                          >
                            Review
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
