'use client'

import { AdminStatsCards } from './AdminStatsCards'
import { PendingSupervisorApprovals } from './PendingSupervisorApprovals'
import { RecentActivityCard } from './RecentActivityCard'
import { TopStudentsCard } from './TopStudentsCard'
import { SystemStatusCard } from './SystemStatusCard'

interface OverviewTabProps {
  overview: any
  students: any[]
  supervisors: any[]
  pendingSupervisors: any[]
  hours: any[]
  organizations: any[]
  topStudents: any[]
  isProcessing: boolean
  onApproveSupervisor: (id: string) => void
  onRejectSupervisor: (id: string) => void
  userRole?: string
}

export function OverviewTab({
  overview,
  students,
  supervisors,
  pendingSupervisors,
  hours,
  organizations,
  topStudents,
  isProcessing,
  onApproveSupervisor,
  onRejectSupervisor,
  userRole,
}: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <AdminStatsCards overview={overview} students={students} supervisors={supervisors} hours={hours} organizations={organizations} />
      <PendingSupervisorApprovals
        pendingSupervisors={pendingSupervisors}
        onApprove={onApproveSupervisor}
        onReject={onRejectSupervisor}
        isProcessing={isProcessing}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard hours={hours} />
        <TopStudentsCard topStudents={topStudents} />
      </div>
      <SystemStatusCard overview={overview} hours={hours} students={students} supervisors={supervisors} />
    </div>
  )
}
