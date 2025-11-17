'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

interface PendingSupervisorApprovalsProps {
  pendingSupervisors: any[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  isProcessing: boolean
}

export function PendingSupervisorApprovals({
  pendingSupervisors,
  onApprove,
  onReject,
  isProcessing,
}: PendingSupervisorApprovalsProps) {
  if (pendingSupervisors.length === 0) return null

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Pending Supervisor Approvals</CardTitle>
        <CardDescription>{pendingSupervisors.length} supervisor applications awaiting approval</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingSupervisors.map((supervisor) => (
            <div key={supervisor._id} className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex-1 space-y-2">
                <div>
                  <p className="font-semibold text-lg">
                    {supervisor.firstName} {supervisor.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{supervisor.email}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Organization{supervisor.organizationNames && supervisor.organizationNames.length > 1 ? 's' : ''}:</span>{' '}
                    <span className="text-muted-foreground">
                      {supervisor.organizationNames && supervisor.organizationNames.length > 0
                        ? supervisor.organizationNames.join(', ')
                        : typeof supervisor.organization === 'string'
                        ? supervisor.organization
                        : supervisor.organization?.name || 'Unknown'}
                    </span>
                  </p>

                  {supervisor.proofType && (
                    <p className="text-sm">
                      <span className="font-medium">Proof Type:</span>{' '}
                      <span className="text-muted-foreground capitalize">{supervisor.proofType}</span>
                    </p>
                  )}

                  {supervisor.proofOfExistence && (
                    <div className="mt-2 p-3 bg-background/50 rounded-md border border-border/30">
                      <p className="text-sm font-medium mb-1">Verification Details:</p>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        "{supervisor.proofOfExistence}"
                      </p>
                    </div>
                  )}

                  {supervisor.createdAt && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Applied: {new Date(supervisor.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <Button size="sm" onClick={() => onApprove(supervisor._id)} disabled={isProcessing} className="whitespace-nowrap">
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onReject(supervisor._id)} disabled={isProcessing} className="whitespace-nowrap">
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
