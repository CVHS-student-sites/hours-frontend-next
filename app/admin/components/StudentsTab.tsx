'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchAndStatusFilter } from './SearchAndStatusFilter'
import { StudentsTable } from './StudentsTable'
import { UserPlus } from 'lucide-react'

interface StudentsTabProps {
  students: any[]
  studentsPagination: any
  studentsLoading: boolean
  studentsActions: any
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  onEditStudent: (student: any) => void
  onDeleteStudent?: (student: any) => void
  onViewHours?: (student: any) => void
  onCreateStudent?: () => void
  isProcessing: boolean
}

export function StudentsTab({
  students,
  studentsPagination,
  studentsLoading,
  studentsActions,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onEditStudent,
  onDeleteStudent,
  onViewHours,
  onCreateStudent,
  isProcessing
}: StudentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Students</CardTitle>
            <CardDescription>
              Manage student accounts and service hours ({studentsPagination.total} total)
            </CardDescription>
          </div>
          {onCreateStudent && (
            <Button onClick={onCreateStudent} className="bg-[#0084ff] hover:bg-[#0070e6] text-white">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Student
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <SearchAndStatusFilter
          searchValue={searchTerm}
          onSearchChange={onSearchChange}
          statusValue={statusFilter}
          onStatusChange={onStatusChange}
          searchPlaceholder="Search by name, email, or student ID..."
          showStatusFilter={true}
          statusOptions={[
            { value: 'all', label: 'All Status' },
            { value: 'verified', label: 'Verified' },
            { value: 'unverified', label: 'Unverified' }
          ]}
        />
        <StudentsTable
          students={students}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
          onViewHours={onViewHours}
          isProcessing={isProcessing || studentsLoading}
          pagination={studentsPagination}
          onPageChange={studentsActions.setPage}
          onLimitChange={studentsActions.setLimit}
          loading={studentsLoading}
        />
      </CardContent>
    </Card>
  )
}
