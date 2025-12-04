import { apiClient } from '@/lib/api-client'
import { Student } from '@/types/api'

export function useAdminStudentActions(refetch: () => Promise<void>, setError: (error: string | null) => void) {
  const updateStudent = async (studentId: string, updates: Partial<Student>) => {
    try {
      const response = await apiClient.put(`/admin/students/${studentId}`, updates)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to update student')
      throw err
    }
  }
  const deleteStudent = async (studentId: string) => {
    try {
      const response = await apiClient.delete(`/admin/students/${studentId}`)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to delete student')
      throw err
    }
  }
  const resetStudentPassword = async (studentId: string, newPassword: string) => {
    try {
      const response = await apiClient.post(`/admin/students/reset-password`, { studentId, newPassword })
      if (response.success) return true
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to reset password')
      throw err
    }
  }

  const resendStudentVerification = async (studentId: string) => {
    try {
      const response = await apiClient.resendStudentVerification(studentId)
      if (response.success) return true
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email')
      throw err
    }
  }

  const verifyStudentEmail = async (studentId: string) => {
    try {
      const response = await apiClient.verifyStudentEmail(studentId)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to verify student email')
      throw err
    }
  }

  const unverifyStudentEmail = async (studentId: string) => {
    try {
      const response = await apiClient.unverifyStudentEmail(studentId)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to unverify student email')
      throw err
    }
  }

  const changeStudentPassword = async (studentId: string, newPassword: string) => {
    try {
      const response = await apiClient.changeStudentPassword(studentId, newPassword)
      if (response.success) return true
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to change student password')
      throw err
    }
  }

  const createStudentManually = async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    studentId: string
    graduatingYear: number
    emailVerified?: boolean
  }) => {
    try {
      const response = await apiClient.createStudentManually(data)
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to create student')
      throw err
    }
  }

  return {
    updateStudent,
    deleteStudent,
    resetStudentPassword,
    resendStudentVerification,
    verifyStudentEmail,
    unverifyStudentEmail,
    changeStudentPassword,
    createStudentManually,
  }
}
