"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api-client"

interface Organization {
  id: string
  name: string
  verified?: boolean
}

interface AllOrganizationsSelectorProps {
  value?: Organization | null
  onChange: (organization: Organization | null) => void
  disabled?: boolean
  placeholder?: string
  required?: boolean
  className?: string
}

/**
 * AllOrganizationsSelector - Searches and selects from ALL organizations in the system
 * Unlike OrganizationSelector, this does not filter by supervisor
 */
export function AllOrganizationsSelector({
  value,
  onChange,
  disabled = false,
  placeholder = "Select organization",
  required = false,
  className,
}: AllOrganizationsSelectorProps) {
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([])
  const [organizationSearch, setOrganizationSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load popular organizations on mount
  useEffect(() => {
    const loadPopularOrganizations = async () => {
      if (allOrganizations.length > 0) return

      try {
        setIsLoading(true)
        const response = await apiClient.get("/organizations/popular?limit=50")
        if (response.success && response.data.organizations) {
          setAllOrganizations(response.data.organizations)
        }
      } catch (err) {
        console.error("Failed to load popular organizations:", err)
        setAllOrganizations([])
      } finally {
        setIsLoading(false)
      }
    }

    loadPopularOrganizations()
  }, [allOrganizations.length])

  // Search organizations via API with debouncing
  useEffect(() => {
    const searchTerm = organizationSearch.trim()

    if (!searchTerm) {
      // When search is cleared, reload popular organizations
      const reloadPopular = async () => {
        try {
          setIsLoading(true)
          const response = await apiClient.get("/organizations/popular?limit=50")
          if (response.success && response.data.organizations) {
            setAllOrganizations(response.data.organizations)
          }
        } catch (err) {
          console.error("Failed to reload popular organizations:", err)
        } finally {
          setIsLoading(false)
        }
      }
      reloadPopular()
      return
    }

    setIsLoading(true)

    const searchOrganizations = async () => {
      try {
        const response = await apiClient.get(`/organizations/search?q=${encodeURIComponent(searchTerm)}&limit=50`)
        if (response.success && response.data.organizations) {
          setAllOrganizations(response.data.organizations)
        }
      } catch (err) {
        console.error("Failed to search organizations:", err)
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce search by 300ms
    const timeoutId = setTimeout(searchOrganizations, 300)
    return () => clearTimeout(timeoutId)
  }, [organizationSearch])

  // Filter and sort organizations for display
  const filteredOrganizations = useMemo(() => {
    return allOrganizations.sort((a, b) => {
      // Prioritize verified organizations
      if (a.verified && !b.verified) return -1
      if (!a.verified && b.verified) return 1

      // Then sort alphabetically
      return a.name.localeCompare(b.name)
    })
  }, [allOrganizations])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn("w-full justify-between font-normal", className)}
          disabled={disabled}
        >
          {value ? (
            <div className="flex items-center gap-2 truncate">
              {value.name}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="flex flex-col h-[400px]">
          {/* Search Input */}
          <div className="p-3 border-b">
            <Input
              placeholder="Search all organizations..."
              value={organizationSearch}
              onChange={(e) => setOrganizationSearch(e.target.value)}
              className="h-9"
              autoFocus
            />
          </div>

          {/* Organizations List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-5 w-5 border-2 border-[#0084ff] border-t-transparent rounded-full animate-spin"></div>
                  <span>{organizationSearch ? 'Searching...' : 'Loading organizations...'}</span>
                </div>
              </div>
            ) : (
              <>
                {filteredOrganizations.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    {organizationSearch ?
                      `No organizations found for "${organizationSearch}"` :
                      "No organizations available"
                    }
                  </div>
                ) : (
                  <div className="p-1">
                    {/* Verified Organizations */}
                    {filteredOrganizations.some(org => org.verified) && (
                      <>
                        <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                          Verified Organizations
                        </div>
                        {filteredOrganizations
                          .filter(org => org.verified)
                          .map((organization) => (
                            <button
                              key={organization.id}
                              onClick={() => {
                                onChange(organization)
                                setIsOpen(false)
                                setOrganizationSearch("")
                              }}
                              className={cn(
                                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-left",
                                value?.id === organization.id && "bg-muted"
                              )}
                            >
                              <Check
                                className={cn(
                                  "h-4 w-4 shrink-0",
                                  value?.id === organization.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <span className="flex-1 truncate">{organization.name}</span>
                              <span className="text-xs text-green-600">✓</span>
                            </button>
                          ))}
                      </>
                    )}

                    {/* Other Organizations */}
                    {filteredOrganizations.some(org => !org.verified) && (
                      <>
                        {filteredOrganizations.some(org => org.verified) && (
                          <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground mt-2">
                            Other Organizations
                          </div>
                        )}
                        {filteredOrganizations
                          .filter(org => !org.verified)
                          .map((organization) => (
                            <button
                              key={organization.id}
                              onClick={() => {
                                onChange(organization)
                                setIsOpen(false)
                                setOrganizationSearch("")
                              }}
                              className={cn(
                                "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-left",
                                value?.id === organization.id && "bg-muted"
                              )}
                            >
                              <Check
                                className={cn(
                                  "h-4 w-4 shrink-0",
                                  value?.id === organization.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <span className="flex-1 truncate">{organization.name}</span>
                            </button>
                          ))}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
