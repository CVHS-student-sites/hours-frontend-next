import { apiClient } from '@/lib/api-client'
import { Organization } from '@/types/api'

export function useAdminOrganizationActions(refetch: () => Promise<void>, setError: (error: string | null) => void) {
  const createOrganization = async (orgData: any) => {
    try {
      const response = await apiClient.post('/admin/organizations', orgData)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to create organization')
      throw err
    }
  }
  const updateOrganization = async (organizationId: string, updates: Partial<Organization>) => {
    try {
      const response = await apiClient.put(`/admin/organizations/${organizationId}`, updates)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to update organization')
      throw err
    }
  }
  const deleteOrganization = async (organizationId: string) => {
    try {
      const response = await apiClient.delete(`/admin/organizations/${organizationId}`)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to delete organization')
      throw err
    }
  }
  return { createOrganization, updateOrganization, deleteOrganization }
}
