"use client"

import type { ReactNode } from "react"
import { TopNav } from "./top-nav"
import { BottomTabs } from "./bottom-tabs"
import { useIsMobile } from "@/hooks/use-mobile"

interface AppShellProps {
  children: ReactNode
  showBottomTabs?: boolean
  userRole?: "student" | "supervisor" | "admin"
}

export function AppShell({ children, showBottomTabs = false, userRole }: AppShellProps) {
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-background">
      <TopNav userRole={userRole} />
      <main className="pb-safe">{children}</main>
      {showBottomTabs && isMobile && <BottomTabs userRole={userRole} />}
    </div>
  )
}
