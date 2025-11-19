'use client'
import { useAdminAdminManagement } from './useAdminAdminManagement'
import { useAdminPasswordReset } from './useAdminPasswordReset'

export function useAdminAdminHandlers(state: any) {
  const adminManagement = useAdminAdminManagement(state)
  const passwordReset = useAdminPasswordReset(state)
  return { ...adminManagement, ...passwordReset }
}
