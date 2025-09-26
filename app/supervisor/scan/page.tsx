"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QrCode, Download, Share, Plus, Users, Calendar } from "lucide-react"

export default function SupervisorScanPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQR, setGeneratedQR] = useState<string | null>(null)

  // Mock recent scans data
  const recentScans = [
    {
      id: 1,
      student: "John Doe",
      time: "2 minutes ago",
      hours: 4.0,
      event: "Community Food Drive",
    },
    {
      id: 2,
      student: "Sarah Wilson",
      time: "5 minutes ago",
      hours: 4.0,
      event: "Community Food Drive",
    },
    {
      id: 3,
      student: "Mike Johnson",
      time: "8 minutes ago",
      hours: 4.0,
      event: "Community Food Drive",
    },
  ]

  const handleGenerateQR = () => {
    setIsGenerating(true)
    // Simulate QR generation
    setTimeout(() => {
      setGeneratedQR("https://cvhs-service.app/scan/event/abc123")
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <AppShell showBottomTabs userRole="supervisor">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <PageHeader title="QR Code Management" subtitle="Generate QR codes for events and monitor student check-ins" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code Generator */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-[#0084ff]" />
                  Generate Event QR Code
                </CardTitle>
                <CardDescription>Create a QR code for students to scan and log hours instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Event Name *</Label>
                  <Input id="event-name" placeholder="Community Food Drive" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Event Date *</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Hours *</Label>
                    <Input id="hours" type="number" step="0.5" placeholder="4.0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Local Food Bank - 123 Main St" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Sorting donations and helping with food distribution"
                    className="min-h-[80px]"
                  />
                </div>

                <Button
                  onClick={handleGenerateQR}
                  disabled={isGenerating}
                  className="w-full bg-[#0084ff] hover:bg-[#0070e6] text-white"
                >
                  {isGenerating ? "Generating..." : "Generate QR Code"}
                </Button>
              </CardContent>
            </Card>

            {/* Generated QR Code */}
            {generatedQR && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated QR Code</CardTitle>
                  <CardDescription>Students can scan this code to log their hours</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="bg-white p-8 rounded-lg inline-block">
                    <div className="w-48 h-48 bg-black/10 rounded-lg flex items-center justify-center">
                      <QrCode className="h-32 w-32 text-black/60" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Event: Community Food Drive</p>
                    <p className="text-xs text-muted-foreground font-mono">{generatedQR}</p>
                  </div>

                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Live Scan Feed */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Live Scan Feed
                </CardTitle>
                <CardDescription>Real-time student check-ins for active events</CardDescription>
              </CardHeader>
              <CardContent>
                {recentScans.length === 0 ? (
                  <div className="text-center py-8">
                    <QrCode className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-pretty">
                      No recent scans. Generate a QR code to start tracking student check-ins.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentScans.map((scan) => (
                      <div key={scan.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium text-balance">{scan.student}</p>
                          <p className="text-sm text-muted-foreground">{scan.event}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            {scan.hours}h
                          </Badge>
                          <p className="text-xs text-muted-foreground">{scan.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#0084ff]" />
                    Active Events
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        New Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Event</DialogTitle>
                        <DialogDescription>Set up a new volunteer event for students</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-event-name">Event Name</Label>
                          <Input id="new-event-name" placeholder="Beach Cleanup" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-event-date">Date</Label>
                            <Input id="new-event-date" type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-event-hours">Hours</Label>
                            <Input id="new-event-hours" type="number" step="0.5" placeholder="3.0" />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-[#0084ff] hover:bg-[#0070e6] text-white">Create Event</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">Community Food Drive</p>
                      <p className="text-sm text-green-600 dark:text-green-400">Today • 4 hours</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <Users className="mr-1 h-3 w-3" />
                        12 checked in
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Library Reading Program</p>
                      <p className="text-sm text-muted-foreground">Tomorrow • 2 hours</p>
                    </div>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Senior Center Visit</p>
                      <p className="text-sm text-muted-foreground">Jan 25 • 3 hours</p>
                    </div>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
