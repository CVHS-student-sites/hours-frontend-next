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

interface DeleteStudentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student: any | null
  onConfirm: () => void
  isProcessing: boolean
}

export function DeleteStudentDialog({ open, onOpenChange, student, onConfirm, isProcessing }: DeleteStudentDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Student Account?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the student account and all associated data.
            {student && (
              <div className="mt-4 p-4 bg-muted rounded-md space-y-1">
                <p className="font-semibold text-foreground">
                  {student.firstName} {student.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{student.email}</p>
                <p className="text-sm text-muted-foreground">Student ID: {student.studentId}</p>
                <p className="text-sm text-muted-foreground">Grade {student.grade}, Class of {student.graduatingYear}</p>
                <p className="text-sm font-medium mt-2 text-foreground">Total Hours: {student.totalHours || 0}h</p>
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
              'Delete Student'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
