'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-react'

interface DeleteSupervisorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  supervisor: any | null
  onConfirm: () => void
  isProcessing: boolean
}

export function DeleteSupervisorDialog({ open, onOpenChange, supervisor, onConfirm, isProcessing }: DeleteSupervisorDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Supervisor Account?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the supervisor account and all associated data.
            {supervisor && (
              <div className="mt-4 p-4 bg-muted rounded-md space-y-1">
                <p className="font-semibold text-foreground">
                  {supervisor.firstName} {supervisor.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{supervisor.email}</p>
                {supervisor.organizationNames && supervisor.organizationNames.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Organizations: {supervisor.organizationNames.join(', ')}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Status: {supervisor.isActive ? 'Active' : 'Pending'}
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isProcessing}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Supervisor'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
