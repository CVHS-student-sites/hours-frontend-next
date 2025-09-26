"use client"

import type React from "react"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Info, Save } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function AddHoursPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    router.push("/student/hours")
  }

  return (
    <AppShell showBottomTabs userRole="student">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <PageHeader
          title="Add Service Hours"
          subtitle="Log your community service activities for approval"
          showBack
          onBack={() => router.back()}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Service Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours">Hours Worked *</Label>
                  <Input id="hours" type="number" step="0.5" min="0.5" max="24" placeholder="4.0" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization or add new" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food-bank">Local Food Bank</SelectItem>
                    <SelectItem value="animal-shelter">Animal Shelter</SelectItem>
                    <SelectItem value="community-garden">Community Garden</SelectItem>
                    <SelectItem value="senior-center">Senior Center</SelectItem>
                    <SelectItem value="library">Public Library</SelectItem>
                    <SelectItem value="hospital">Community Hospital</SelectItem>
                    <SelectItem value="other">Other (specify below)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor-email">Supervisor Email *</Label>
                <Input id="supervisor-email" type="email" placeholder="jane.smith@organization.org" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Activity Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you did during your service. Be specific about tasks and impact."
                  className="min-h-[100px]"
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Important Notes */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-pretty">
              <strong>Important:</strong> Your supervisor will receive an email to verify and approve these hours. Make
              sure all information is accurate and your supervisor's email is correct.
            </AlertDescription>
          </Alert>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#0084ff] hover:bg-[#0070e6] text-white" disabled={isSubmitting}>
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Submit for Approval
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  )
}
