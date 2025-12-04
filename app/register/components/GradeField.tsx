'use client'

import { UseFormReturn } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface GradeFieldProps {
  form: UseFormReturn<any>
  disabled?: boolean
}

const GRADES = [
  { value: 9, label: '9th Grade (Freshman)' },
  { value: 10, label: '10th Grade (Sophomore)' },
  { value: 11, label: '11th Grade (Junior)' },
  { value: 12, label: '12th Grade (Senior)' },
]

export function GradeField({ form, disabled }: GradeFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="grade">Grade</Label>
      <Select
        value={form.watch('grade')?.toString() || ''}
        onValueChange={(value) => form.setValue('grade', parseInt(value))}
        disabled={disabled}
      >
        <SelectTrigger className="bg-muted/50">
          <SelectValue placeholder="Select your grade" />
        </SelectTrigger>
        <SelectContent>
          {GRADES.map((grade) => (
            <SelectItem key={grade.value} value={grade.value.toString()}>
              {grade.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
