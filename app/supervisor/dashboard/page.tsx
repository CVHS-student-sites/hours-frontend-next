"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Clock, Users, AlertTriangle, TrendingUp, Eye } from "lucide-react"

export default function SupervisorDashboard() {
  const [selectedEntries, setSelectedEntries] = useState<number[]>([])
  const [bulkAction, setBulkAction] = useState<"approve" | "reject" | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  // Mock data - in real app this would come from API
  const supervisorData = {
    name: "Jane Smith",
    organization: "Local Food Bank",
    pendingApprovals: 12,
    approvedThisWeek: 28,
    totalStudents: 45,
    avgResponseTime: "2.3 hours",
  }

  const pendingEntries = [
    {
      id: 1,
      student: {
        name: "John Doe",
        grade: "11th",
        email: "john.doe@student.cvhs.edu",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-15",
      hours: 4.0,
      description: "Sorted donations and helped with food distribution during the weekend drive",
      submittedAt: "2024-01-16T10:30:00Z",
      },
    {
      id: 2,
      student: {
        name: "Sarah Wilson",
        grade: "12th",
        email: "sarah.wilson@student.cvhs.edu",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-14",
      hours: 3.5,
      description: "Assisted with meal preparation and served food to community members",
      submittedAt: "2024-01-15T14:20:00Z",

    },
    {
      id: 3,
      student: {
        name: "Mike Johnson",
        grade: "10th",
        email: "mike.johnson@student.cvhs.edu",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-13",
      hours: 2.5,
      description: "Organized inventory and restocked shelves in the food pantry",
      submittedAt: "2024-01-14T09:15:00Z",
    },
  ]

  const handleSelectEntry = (entryId: number, checked: boolean) => {
    if (checked) {
      setSelectedEntries([...selectedEntries, entryId])
    } else {
      setSelectedEntries(selectedEntries.filter((id) => id !== entryId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEntries(pendingEntries.map((entry) => entry.id))
    } else {
      setSelectedEntries([])
    }
  }

  const handleBulkApprove = () => {
    // Handle bulk approval logic
    console.log("Approving entries:", selectedEntries)
    setSelectedEntries([])
  }

  const handleBulkReject = () => {
    // Handle bulk rejection logic
    console.log("Rejecting entries:", selectedEntries, "Reason:", rejectionReason)
    setSelectedEntries([])
    setRejectionReason("")
    setBulkAction(null)
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <AppShell showBottomTabs userRole="supervisor">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8">
          <GradientCard variant="hero" className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={supervisorData.name} />
                  <AvatarFallback className="bg-[#0084ff] text-white text-lg">
                    {supervisorData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-balance">Welcome, {supervisorData.name}</h1>
                  <p className="text-muted-foreground">{supervisorData.organization} • Supervisor</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#0084ff]">{supervisorData.pendingApprovals}</div>
                <p className="text-sm text-muted-foreground">pending approvals</p>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GradientCard variant="stat" className="p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-orange-500">{supervisorData.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">awaiting review</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500/60" />
              </div>
            </CardContent>
          </GradientCard>

          <Card className="p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved This Week</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-500">{supervisorData.approvedThisWeek}</div>
                  <p className="text-xs text-muted-foreground">hours approved</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Students</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{supervisorData.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">volunteering</p>
                </div>
                <Users className="h-8 w-8 text-blue-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-[#0084ff]">{supervisorData.avgResponseTime}</div>
                  <p className="text-xs text-muted-foreground">to approve</p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#0084ff]/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Approval Queue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Approval Queue</CardTitle>
                <CardDescription>Review and approve student service hour submissions</CardDescription>
              </div>
              {selectedEntries.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve ({selectedEntries.length})
                  </Button>
                  <Dialog open={bulkAction === "reject"} onOpenChange={(open) => setBulkAction(open ? "reject" : null)}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject ({selectedEntries.length})
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Selected Entries</DialogTitle>
                        <DialogDescription>
                          Please provide a reason for rejecting these {selectedEntries.length} entries. Students will
                          receive this feedback.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="rejection-reason">Rejection Reason</Label>
                          <Textarea
                            id="rejection-reason"
                            placeholder="Please provide more documentation or clarify the activities performed..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setBulkAction(null)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleBulkReject} disabled={!rejectionReason.trim()}>
                            Reject Entries
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {pendingEntries.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground text-pretty">
                  No pending approvals at the moment. Great job staying on top of student submissions!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Select All */}
                <div className="flex items-center space-x-2 pb-2 border-b">
                  <Checkbox
                    checked={selectedEntries.length === pendingEntries.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <Label className="text-sm font-medium">Select all ({pendingEntries.length} entries)</Label>
                </div>

                {/* Entries */}
                {pendingEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      selectedEntries.includes(entry.id) ? "bg-[#0084ff]/5 border-[#0084ff]/20" : "bg-card/50"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={selectedEntries.includes(entry.id)}
                        onCheckedChange={(checked) => handleSelectEntry(entry.id, checked as boolean)}
                      />

                      <Avatar className="h-10 w-10">
                        <AvatarImage src={entry.student.avatar || "/placeholder.svg"} alt={entry.student.name} />
                        <AvatarFallback className="bg-[#0084ff] text-white">
                          {entry.student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-balance">{entry.student.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {entry.student.grade} • {entry.student.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-[#0084ff]">{entry.hours}h</div>
                            <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground text-pretty mb-3">{entry.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              Submitted {getTimeAgo(entry.submittedAt)}
                            </span>
                            {entry.photos > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {entry.photos} photo{entry.photos > 1 ? "s" : ""}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-3 w-3" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
