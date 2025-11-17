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
      return false
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
      return false
    }
  }
  const resetStudentPassword = async (studentId: string, newPassword: string) => {
    try {
      const response = await apiClient.post(`/admin/students/reset-password`, { studentId, newPassword })
      if (response.success) return true
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to reset password')
      return false
    }
  }
  const getGraduatedStudents = async () => {
    try {
      const response = await apiClient.get<Student[]>('/admin/students/graduated')
      if (response.success && response.data) return response.data
      return []
    } catch (err: any) {
      setError(err.message || 'Failed to fetch graduated students')
      return []
    }
  }
  const deleteGraduatedStudents = async () => {
    try {
      const response = await apiClient.delete('/admin/students/graduated')
      if (response.success) {
        await refetch()
        return true
      }
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to delete graduated students')
      return false
    }
  }

  const resendStudentVerification = async (studentId: string) => {
    try {
      const response = await apiClient.resendStudentVerification(studentId)
      if (response.success) return true
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email')
      return false
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
      return false
    }
  }

  const changeStudentPassword = async (studentId: string, newPassword: string) => {
    try {
      const response = await apiClient.changeStudentPassword(studentId, newPassword)
      if (response.success) return true
      return false
    } catch (err: any) {
      setError(err.message || 'Failed to change student password')
      return false
    }
  }

  const createStudentManually = async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    studentId: string
    grade: number
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
      return false
    }
  }

  return {
    updateStudent,
    deleteStudent,
    resetStudentPassword,
    getGraduatedStudents,
    deleteGraduatedStudents,
    resendStudentVerification,
    verifyStudentEmail,
    changeStudentPassword,
    createStudentManually,
  }
}
