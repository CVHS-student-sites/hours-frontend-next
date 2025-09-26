"use client"

import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Clock, Award, Building2 } from "lucide-react"

export default function SupervisorStatsPage() {
  // Mock data for charts
  const approvalData = [
    { month: "Sep", approved: 45, rejected: 3 },
    { month: "Oct", approved: 52, rejected: 2 },
    { month: "Nov", approved: 38, rejected: 4 },
    { month: "Dec", approved: 41, rejected: 1 },
    { month: "Jan", approved: 28, rejected: 2 },
  ]

  const hoursByOrg = [
    { name: "Food Bank", hours: 156, students: 12 },
    { name: "Animal Shelter", hours: 89, students: 8 },
    { name: "Senior Center", hours: 67, students: 6 },
    { name: "Library", hours: 45, students: 9 },
    { name: "Community Garden", hours: 34, students: 5 },
  ]

  const peakDays = [
    { day: "Mon", hours: 12 },
    { day: "Tue", hours: 8 },
    { day: "Wed", hours: 15 },
    { day: "Thu", hours: 22 },
    { day: "Fri", hours: 18 },
    { day: "Sat", hours: 35 },
    { day: "Sun", hours: 28 },
  ]

  const gradeDistribution = [
    { grade: "9th", value: 15, color: "#0084ff" },
    { grade: "10th", value: 18, color: "#4f46e5" },
    { grade: "11th", value: 22, color: "#7c3aed" },
    { grade: "12th", value: 25, color: "#06b6d4" },
  ]

  const topStudents = [
    { name: "Sarah Wilson", grade: "12th", hours: 45.5, rank: 1 },
    { name: "John Doe", grade: "11th", hours: 42.0, rank: 2 },
    { name: "Mike Johnson", grade: "10th", hours: 38.5, rank: 3 },
    { name: "Emma Davis", grade: "12th", hours: 35.0, rank: 4 },
    { name: "Alex Chen", grade: "11th", hours: 32.5, rank: 5 },
  ]

  return (
    <AppShell showBottomTabs userRole="supervisor">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <PageHeader
          title="Statistics & Analytics"
          subtitle="Track volunteer activity and student progress across your organization"
          action={
            <Select defaultValue="all-time">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-semester">This Semester</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours Supervised</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-[#0084ff]">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </div>
                <Clock className="h-8 w-8 text-[#0084ff]/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">across all grades</p>
                </div>
                <Users className="h-8 w-8 text-blue-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approval Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-500">94.2%</div>
                  <p className="text-xs text-muted-foreground">last 30 days</p>
                </div>
                <Award className="h-8 w-8 text-green-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">2.3h</div>
                  <p className="text-xs text-muted-foreground">to approve hours</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Approvals Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Approvals Over Time</CardTitle>
              <CardDescription>Monthly approval and rejection trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={approvalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="approved" fill="#0084ff" name="Approved" />
                  <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Peak Activity Days */}
          <Card>
            <CardHeader>
              <CardTitle>Peak Activity Days</CardTitle>
              <CardDescription>Hours logged by day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={peakDays}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#0084ff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hours by Organization */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Hours by Organization
              </CardTitle>
              <CardDescription>Service hours breakdown across different volunteer organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hoursByOrg.map((org, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-balance">{org.name}</h4>
                        <div className="text-right">
                          <span className="text-lg font-bold text-[#0084ff]">{org.hours}h</span>
                          <p className="text-xs text-muted-foreground">{org.students} students</p>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-[#0084ff] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(org.hours / Math.max(...hoursByOrg.map((o) => o.hours))) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grade Distribution & Top Students */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Student participation by grade level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {gradeDistribution.map((grade, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: grade.color }} />
                      <span className="text-sm">
                        {grade.grade}: {grade.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#0084ff]" />
                  Top Volunteers
                </CardTitle>
                <CardDescription>Students with the most service hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topStudents.map((student) => (
                    <div key={student.rank} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            student.rank === 1
                              ? "bg-yellow-500"
                              : student.rank === 2
                                ? "bg-gray-400"
                                : student.rank === 3
                                  ? "bg-amber-600"
                                  : "bg-[#0084ff]"
                          }`}
                        >
                          {student.rank}
                        </div>
                        <div>
                          <p className="font-medium text-balance">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.grade}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{student.hours}h</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
