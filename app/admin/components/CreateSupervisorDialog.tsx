'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OrganizationSelector } from '@/components/ui/organization-selector'
import { Loader2, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface CreateSupervisorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    organizationIds: string[]
  }) => Promise<void>
  isProcessing: boolean
}

export function CreateSupervisorDialog({ open, onOpenChange, onCreate, isProcessing }: CreateSupervisorDialogProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    selectedOrganizations: [] as Array<{ id: string; name: string; verified: boolean }>,
  })

  const handleSubmit = async () => {
    await onCreate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      organizationIds: formData.selectedOrganizations.map((org) => org.id),
    })
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      selectedOrganizations: [],
    })
  }

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addOrganization = (org: { id: string; name: string; verified: boolean }) => {
    const exists = formData.selectedOrganizations.some((o) => o.id === org.id)
    if (!exists) {
      setFormData((prev) => ({
        ...prev,
        selectedOrganizations: [...prev.selectedOrganizations, org],
      }))
    }
  }

  const removeOrganization = (orgId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedOrganizations: prev.selectedOrganizations.filter((o) => o.id !== orgId),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Supervisor Manually</DialogTitle>
          <DialogDescription>Create and auto-approve a supervisor account</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="create-sup-firstName">First Name *</Label>
              <Input
                id="create-sup-firstName"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                disabled={isProcessing}
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-sup-lastName">Last Name *</Label>
              <Input
                id="create-sup-lastName"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                disabled={isProcessing}
                placeholder="Smith"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-sup-email">Email *</Label>
            <Input
              id="create-sup-email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              disabled={isProcessing}
              placeholder="supervisor@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-sup-password">Password *</Label>
            <Input
              id="create-sup-password"
              type="password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              disabled={isProcessing}
              placeholder="Minimum 8 characters"
            />
          </div>
          <div className="space-y-2">
            <Label>Organizations * (Select at least one)</Label>
            <div className="space-y-2">
              {formData.selectedOrganizations.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                  {formData.selectedOrganizations.map((org) => (
                    <Badge key={org.id} variant="secondary" className="flex items-center gap-1">
                      {org.name}
                      <button
                        onClick={() => removeOrganization(org.id)}
                        disabled={isProcessing}
                        className="ml-1 hover:text-red-600"
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <OrganizationSelector
                value={null}
                onChange={(org) => {
                  if (org) {
                    addOrganization(org)
                  }
                }}
                placeholder="Add organization..."
                disabled={isProcessing}
                allowAddNew={false}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#0084ff] hover:bg-[#0070e6] text-white"
            disabled={isProcessing || formData.selectedOrganizations.length === 0}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Supervisor'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
