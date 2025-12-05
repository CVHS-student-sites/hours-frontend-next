import { apiClient } from '@/lib/api-client'

export function useAdminHourActions(refetch: () => Promise<void>, setError: (error: string | null) => void) {
  const createHourForStudent = async (hourData: any) => {
    try {
      const response = await apiClient.post('/admin/hours', hourData)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to create hour')
      throw err
    }
  }
  const approveHour = async (hourId: string) => {
    try {
      const response = await apiClient.post(`/admin/hours/${hourId}/approve`)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to approve hour')
      throw err
    }
  }
  const rejectHour = async (hourId: string, reason: string) => {
    try {
      const response = await apiClient.post(`/admin/hours/${hourId}/reject`, { reason })
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to reject hour')
      throw err
    }
  }
  const deleteHour = async (hourId: string) => {
    try {
      const response = await apiClient.delete(`/admin/hours/${hourId}`)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to delete hour')
      throw err
    }
  }
  const updateHour = async (hourId: string, updates: { date?: string; hours?: number; description?: string }) => {
    try {
      const response = await apiClient.put(`/admin/hours/${hourId}`, updates)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to update hour')
      throw err
    }
  }
  const createManualHour = async (data: {
    studentId: string
    date: string
    hours: number
    organizationName: string
    supervisorEmail: string
    description: string
  }) => {
    try {
      const response = await apiClient.post('/admin/hours/manual', data)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to create manual hour')
      throw err
    }
  }
  return { createHourForStudent, approveHour, rejectHour, deleteHour, updateHour, createManualHour }
}
