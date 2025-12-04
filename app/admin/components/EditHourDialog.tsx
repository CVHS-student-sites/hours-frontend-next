'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'

interface EditHourDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hour: any | null
  onSubmit: (updatedHour: any) => void
  isProcessing: boolean
}

export function EditHourDialog({
  open,
  onOpenChange,
  hour,
  onSubmit,
  isProcessing,
}: EditHourDialogProps) {
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (hour) {
      setDate(hour.date ? new Date(hour.date).toISOString().split('T')[0] : '')
      setHours(hour.hours?.toString() || '')
      setDescription(hour.description || '')
    }
  }, [hour])

  if (!hour) return null

  const studentName =
    typeof hour.student === 'string' || !hour.student
      ? 'Unknown'
      : `${hour.student.firstName} ${hour.student.lastName}`

  const supervisorName =
    typeof hour.supervisor === 'string' || !hour.supervisor
      ? 'Unknown'
      : `${hour.supervisor.firstName} ${hour.supervisor.lastName}`

  const organizationName =
    typeof hour.organization === 'string'
      ? hour.organization
      : hour.organization?.name || 'Unknown'

  const handleSubmit = () => {
    onSubmit({
      _id: hour._id,
      date,
      hours: parseFloat(hours),
      description,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Service Hour Entry</DialogTitle>
          <DialogDescription>Update the details of this service hour entry</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Student:</span>
                <p className="font-medium">{studentName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Supervisor:</span>
                <p className="font-medium">{supervisorName}</p>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Organization:</span>
                <p className="font-medium">{organizationName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <Badge
                  variant={hour.status === 'approved' ? 'default' : hour.status === 'pending' ? 'secondary' : 'destructive'}
                  className="capitalize"
                >
                  {hour.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hour-date">Date</Label>
            <Input
              id="edit-hour-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hour-hours">Hours</Label>
            <Input
              id="edit-hour-hours"
              type="number"
              step="0.5"
              min="0"
              max="24"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              disabled={isProcessing}
              placeholder="e.g., 2.5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hour-description">Description</Label>
            <Textarea
              id="edit-hour-description"
              placeholder="Describe the service activity..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
              disabled={isProcessing}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-[#0084ff] hover:bg-[#0070e6] text-white" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
