'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CalendarIcon, Save, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { StudentSelector } from '@/components/ui/student-selector'
import { OrganizationSelector } from '@/components/ui/organization-selector'
import { SupervisorSelector } from '@/components/ui/supervisor-selector'
import type { Supervisor } from '@/types/api'

interface CreateManualHourDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (data: any) => Promise<void>
  isProcessing: boolean
}

export function CreateManualHourDialog({
  open,
  onOpenChange,
  onCreate,
  isProcessing,
}: CreateManualHourDialogProps) {
  const [date, setDate] = useState<Date>()
  const [hours, setHours] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null)
  const [selectedOrganization, setSelectedOrganization] = useState<{id: string, name: string} | null>(null)
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')

    if (!date) {
      setError('Please select a date')
      return
    }

    if (!selectedStudent) {
      setError('Please select a student')
      return
    }

    if (!selectedSupervisor) {
      setError('Please select a supervisor')
      return
    }

    if (!selectedOrganization) {
      setError('Please select an organization')
      return
    }

    if (!hours || parseFloat(hours) <= 0) {
      setError('Please enter valid hours')
      return
    }

    if (!description.trim()) {
      setError('Please enter a description')
      return
    }

    try {
      await onCreate({
        studentId: selectedStudent.id || selectedStudent._id,
        date: date.toISOString(),
        hours: parseFloat(hours),
        organizationName: selectedOrganization.name,
        supervisorEmail: selectedSupervisor.email,
        description: description.trim(),
      })

      // Reset form
      setDate(undefined)
      setHours('')
      setSelectedStudent(null)
      setSelectedSupervisor(null)
      setSelectedOrganization(null)
      setDescription('')
      setError('')
      onOpenChange(false)
    } catch (err: any) {
      setError(err.message || 'Failed to create manual hour entry')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Manual Hour Entry</DialogTitle>
          <DialogDescription>
            Manually add a service hour entry for a student
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="student">Student *</Label>
            <StudentSelector
              value={selectedStudent}
              onChange={setSelectedStudent}
              disabled={isProcessing}
              placeholder="Select student"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Service Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                    type="button"
                    disabled={isProcessing}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Hours Worked *</Label>
              <Input
                id="hours"
                type="number"
                step="0.25"
                min="0.25"
                placeholder="4.0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supervisor">Supervisor *</Label>
            <SupervisorSelector
              value={selectedSupervisor}
              onChange={setSelectedSupervisor}
              disabled={isProcessing}
              placeholder="Select supervisor"
              required
            />
            {selectedSupervisor && (
              <p className="text-xs text-muted-foreground">
                {selectedSupervisor.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization *</Label>
            <OrganizationSelector
              value={selectedOrganization}
              onChange={setSelectedOrganization}
              disabled={isProcessing}
              placeholder="Select organization"
              required
              allowAddNew={true}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Activity Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the service activity"
              className="min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isProcessing}
            className="bg-[#0084ff] hover:bg-[#0070e6] text-white"
          >
            {isProcessing ? (
              'Creating...'
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Entry
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
