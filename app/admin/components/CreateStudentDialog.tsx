'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface CreateStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    studentId: string
    graduatingYear: number
    emailVerified: boolean
  }) => Promise<void>
  isProcessing: boolean
}

export function CreateStudentDialog({ open, onOpenChange, onCreate, isProcessing }: CreateStudentDialogProps) {
  const currentYear = new Date().getFullYear()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    studentId: '',
    graduatingYear: currentYear + 4,
    emailVerified: true,
  })

  const handleSubmit = async () => {
    await onCreate(formData)
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      studentId: '',
      graduatingYear: currentYear + 4,
      emailVerified: true,
    })
  }

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Student Manually</DialogTitle>
          <DialogDescription>Create a new student account bypassing the registration flow</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-firstName">First Name *</Label>
              <Input
                id="create-firstName"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                disabled={isProcessing}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-lastName">Last Name *</Label>
              <Input
                id="create-lastName"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                disabled={isProcessing}
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-email">Email *</Label>
            <Input
              id="create-email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              disabled={isProcessing}
              placeholder="student@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-password">Password *</Label>
            <Input
              id="create-password"
              type="password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              disabled={isProcessing}
              placeholder="Minimum 8 characters"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-studentId">Student ID (max 6 digits) *</Label>
            <Input
              id="create-studentId"
              value={formData.studentId}
              onChange={(e) => {
                const value = e.target.value
                // Only allow numbers and limit to 6 digits
                if (value === '' || (/^\d+$/.test(value) && value.length <= 6)) {
                  updateField('studentId', value)
                }
              }}
              disabled={isProcessing}
              placeholder="123456"
              maxLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-graduatingYear">Graduating Year *</Label>
            <Input
              id="create-graduatingYear"
              type="number"
              min={currentYear}
              max={currentYear + 10}
              value={formData.graduatingYear}
              onChange={(e) => updateField('graduatingYear', parseInt(e.target.value))}
              disabled={isProcessing}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="create-emailVerified">Mark Email as Verified</Label>
            <Switch
              id="create-emailVerified"
              checked={formData.emailVerified}
              onCheckedChange={(checked) => updateField('emailVerified', checked)}
              disabled={isProcessing}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#0084ff] hover:bg-[#0070e6] text-white" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Student'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
