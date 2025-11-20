'use client'

import toast from 'react-hot-toast'

export function useAdminUserHandlers(state: any) {
  const handleEditUser = (user: any, type: 'student' | 'supervisor') => {
    state.setEditingUser({ ...user, type })
    state.setIsEditDialogOpen(true)
  }

  const handleSaveUser = async () => {
    if (!state.editingUser) return
    state.setIsProcessing(true)

    try {
      if (state.editingUser.type === 'student') {
        const success = await state.updateStudent(state.editingUser._id, {
          firstName: state.editingUser.firstName,
          lastName: state.editingUser.lastName,
          email: state.editingUser.email,
          studentId: state.editingUser.studentId,
          graduatingYear: state.editingUser.graduatingYear,
          grade: state.editingUser.grade,
        })
        if (success) {
          toast.success('Student updated successfully')
          state.setIsEditDialogOpen(false)
          state.setEditingUser(null)
        }
      } else {
        // Update supervisor basic info
        const success = await state.updateSupervisor(state.editingUser._id, {
          firstName: state.editingUser.firstName,
          lastName: state.editingUser.lastName,
          email: state.editingUser.email,
          isActive: state.editingUser.isActive,
        })
        
        if (success) {
          // Update supervisor organizations if they have changed
          if (state.editingUser.selectedOrganizations) {
            const organizationIds = state.editingUser.selectedOrganizations.map((org: any) => org.id)
            await state.updateSupervisorOrganizations(state.editingUser._id, organizationIds)
          }
          
          toast.success('Supervisor updated successfully')
          state.setIsEditDialogOpen(false)
          state.setEditingUser(null)
        }
      }
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      state.setIsProcessing(false)
    }
  }

  const handleResetPassword = () => {
    if (!state.editingUser) return
    state.setIsResetPasswordDialogOpen(true)
  }

  const handleConfirmPasswordReset = async () => {
    if (!state.editingUser || !state.newPassword.trim()) {
      toast.error('Please enter a new password')
      return
    }

    if (state.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    state.setIsProcessing(true)

    try {
      let success = false
      if (state.editingUser.type === 'student') {
        success = await state.resetStudentPassword(state.editingUser.studentId || state.editingUser._id, state.newPassword)
      } else {
        success = await state.resetSupervisorPassword(state.editingUser.email, state.newPassword)
      }

      if (success) {
        toast.success(
          state.editingUser.type === 'student'
            ? 'Student password has been reset successfully'
            : 'Supervisor password has been reset successfully'
        )
        state.setIsResetPasswordDialogOpen(false)
        state.setNewPassword('')
      } else {
        toast.error('Failed to reset password. Please check if the user exists and try again.')
      }
    } catch (err: any) {
      toast.error('Password reset failed. Please try again.')
    } finally {
      state.setIsProcessing(false)
    }
  }

  const handleUpdateSupervisorOrganizations = (organizations: any[]) => {
    if (!state.editingUser) return
    state.setEditingUser({ ...state.editingUser, selectedOrganizations: organizations })
  }

  const handleDeleteStudent = (student: any) => {
    state.setDeletingStudent(student)
    state.setIsDeleteStudentDialogOpen(true)
  }

  const handleConfirmDeleteStudent = async () => {
    if (!state.deletingStudent) return
    state.setIsProcessing(true)

    try {
      const success = await state.deleteStudent(state.deletingStudent._id)
      if (success) {
        toast.success('Student deleted successfully')
        state.setIsDeleteStudentDialogOpen(false)
        state.setDeletingStudent(null)
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete student')
    } finally {
      state.setIsProcessing(false)
    }
  }

  const handleResendVerification = async () => {
    if (!state.editingUser || state.editingUser.type !== 'student') return
    state.setIsProcessing(true)

    try {
      const success = await state.resendStudentVerification(state.editingUser._id)
      if (success) {
        toast.success('Verification email sent successfully')
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to resend verification email')
    } finally {
      state.setIsProcessing(false)
    }
  }

  const handleManualVerify = async () => {
    if (!state.editingUser || state.editingUser.type !== 'student') return
    state.setIsProcessing(true)

    try {
      const success = await state.verifyStudentEmail(state.editingUser._id)
      if (success) {
        toast.success('Student email verified successfully')
        // Update the editing user to reflect verification
        state.setEditingUser({ ...state.editingUser, emailVerified: true })
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to verify student email')
    } finally {
      state.setIsProcessing(false)
    }
  }

  const handleCreateStudent = async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    studentId: string
    graduatingYear: number
    emailVerified: boolean
  }) => {
    state.setIsProcessing(true)

    try {
      const success = await state.createStudentManually(data)
      if (success) {
        toast.success('Student created successfully')
        state.setIsCreateStudentDialogOpen(false)
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to create student')
    } finally {
      state.setIsProcessing(false)
    }
  }

  const handleCreateSupervisor = async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    organizationIds: string[]
  }) => {
    state.setIsProcessing(true)

    try {
      const success = await state.createSupervisorManually(data)
      if (success) {
        toast.success('Supervisor created successfully')
        state.setIsCreateSupervisorDialogOpen(false)
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to create supervisor')
    } finally {
      state.setIsProcessing(false)
    }
  }

  const handleDeleteSupervisor = (supervisor: any) => {
    state.setDeletingSupervisor(supervisor)
    state.setIsDeleteSupervisorDialogOpen(true)
  }

  const handleConfirmDeleteSupervisor = async () => {
    if (!state.deletingSupervisor) return
    state.setIsProcessing(true)

    try {
      const success = await state.deleteSupervisor(state.deletingSupervisor._id)
      if (success) {
        toast.success('Supervisor deleted successfully')
        state.setIsDeleteSupervisorDialogOpen(false)
        state.setDeletingSupervisor(null)
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete supervisor')
    } finally {
      state.setIsProcessing(false)
    }
  }

  return {
    handleEditUser,
    handleSaveUser,
    handleResetPassword,
    handleConfirmPasswordReset,
    handleUpdateSupervisorOrganizations,
    handleDeleteStudent,
    handleConfirmDeleteStudent,
    handleDeleteSupervisor,
    handleConfirmDeleteSupervisor,
    handleResendVerification,
    handleManualVerify,
    handleCreateStudent,
    handleCreateSupervisor,
  }
}
