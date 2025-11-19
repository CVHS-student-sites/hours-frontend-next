'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchAndStatusFilter } from './SearchAndStatusFilter'
import { SupervisorsTable } from './SupervisorsTable'
import { UserPlus } from 'lucide-react'

interface SupervisorsTabProps {
  supervisors: any[]
  supervisorsPagination: any
  supervisorsLoading: boolean
  supervisorsActions: any
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  onEditSupervisor: (supervisor: any) => void
  onDeleteSupervisor?: (supervisor: any) => void
  onViewHours?: (supervisor: any) => void
  onViewActivity?: (supervisor: any) => void
  onCreateSupervisor?: () => void
  isProcessing: boolean
}

export function SupervisorsTab({
  supervisors,
  supervisorsPagination,
  supervisorsLoading,
  supervisorsActions,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onEditSupervisor,
  onDeleteSupervisor,
  onViewHours,
  onViewActivity,
  onCreateSupervisor,
  isProcessing,
}: SupervisorsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Supervisors</CardTitle>
            <CardDescription>
              Manage supervisor accounts and organizations ({supervisorsPagination.total} total)
            </CardDescription>
          </div>
          {onCreateSupervisor && (
            <Button onClick={onCreateSupervisor} className="bg-[#0084ff] hover:bg-[#0070e6] text-white">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Supervisor
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
          searchPlaceholder="Search by name or email..."
        />
        <SupervisorsTable
          supervisors={supervisors}
          onEditSupervisor={onEditSupervisor}
          onDeleteSupervisor={onDeleteSupervisor}
          onViewHours={onViewHours}
          onViewActivity={onViewActivity}
          isProcessing={isProcessing || supervisorsLoading}
          pagination={supervisorsPagination}
          onPageChange={supervisorsActions.setPage}
          onLimitChange={supervisorsActions.setLimit}
          loading={supervisorsLoading}
        />
      </CardContent>
    </Card>
  )
}
