'use client'
import toast from 'react-hot-toast'

export function useAdminHoursActions(state: any) {
  const handleApproveHours = async () => {
    state.setIsProcessing(true)
    try {
      let successCount = 0
      for (const hourId of state.selectedHours) {
        const success = await state.approveHour(hourId)
        if (success) successCount++
      }
      if (successCount > 0) {
        toast.success(`${successCount} hour entries have been approved.`)
      }
      state.setSelectedHours([])
      await state.refetch()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      state.setIsProcessing(false)
    }
  }
  const handleBulkReject = async () => {
    if (!state.bulkRejectionReason.trim()) {
      toast.error('Please provide a rejection reason')
      return
    }
    state.setIsProcessing(true)
    try {
      let successCount = 0
      for (const hourId of state.selectedHours) {
        const success = await state.rejectHour(hourId, state.bulkRejectionReason)
        if (success) successCount++
      }
      if (successCount > 0) {
        toast.success(`${successCount} hour entries have been rejected.`)
      }
      state.setSelectedHours([])
      state.setBulkRejectionReason('')
      state.setBulkRejectDialogOpen(false)
      await state.refetch()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      state.setIsProcessing(false)
    }
  }
  const handleEditHour = (hour: any) => {
    state.setEditingHour(hour)
    state.setEditHourStatus(hour.status)
    state.setEditRejectionReason(hour.rejectionReason || '')
  }
  const handleSaveHourEdit = async () => {
    if (!state.editingHour) return
    if (state.editHourStatus === 'rejected' && !state.editRejectionReason.trim()) {
      toast.error('Please provide a rejection reason')
      return
    }
    state.setIsProcessing(true)
    try {
      let success = false
      if (state.editHourStatus === 'approved') {
        success = await state.approveHour(state.editingHour._id)
      } else if (state.editHourStatus === 'rejected') {
        success = await state.rejectHour(state.editingHour._id, state.editRejectionReason)
      }
      if (success) {
        toast.success('Hour entry updated successfully')
        state.setEditingHour(null)
        state.setEditRejectionReason('')
      }
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      state.setIsProcessing(false)
    }
  }
  const handleDeleteHour = async () => {
    if (!state.deleteConfirmHour) return
    state.setIsProcessing(true)
    try {
      const success = await state.deleteHour(state.deleteConfirmHour._id)
      if (success) {
        toast.success('Hour entry deleted successfully')
        state.setDeleteConfirmHour(null)
      }
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      state.setIsProcessing(false)
    }
  }
  const handleOpenEditHourDialog = (hour: any) => {
    state.setEditingHourForEdit(hour)
    state.setIsEditHourDialogOpen(true)
  }
  const handleSubmitEditHour = async (updatedHour: any) => {
    state.setIsProcessing(true)
    try {
      const success = await state.updateHour(updatedHour._id, {
        date: updatedHour.date,
        hours: updatedHour.hours,
        description: updatedHour.description,
      })
      if (success) {
        toast.success('Hour entry updated successfully')
        state.setIsEditHourDialogOpen(false)
        state.setEditingHourForEdit(null)
      }
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      state.setIsProcessing(false)
    }
  }
  return { handleApproveHours, handleBulkReject, handleEditHour, handleSaveHourEdit, handleDeleteHour, handleOpenEditHourDialog, handleSubmitEditHour }
}
