"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api-client"

interface Student {
  _id?: string
  id?: string
  firstName: string
  lastName: string
  email: string
  grade?: number
}

interface StudentSelectorProps {
  value?: Student | null
  onChange: (student: Student | null) => void
  disabled?: boolean
  placeholder?: string
  required?: boolean
  className?: string
}

export function StudentSelector({
  value,
  onChange,
  disabled = false,
  placeholder = "Select student",
  required = false,
  className,
}: StudentSelectorProps) {
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [studentSearch, setStudentSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load students on mount or search change
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true)
        const searchParam = studentSearch.trim() ? `?search=${encodeURIComponent(studentSearch.trim())}` : ''
        const response = await apiClient.get(`/admin/students${searchParam}`)

        if (response.success && response.data) {
          const students = Array.isArray(response.data) ? response.data : response.data.students || []
          setAllStudents(students)
        }
      } catch (err) {
        console.error("Failed to load students:", err)
        setAllStudents([])
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce search by 300ms
    const timeoutId = setTimeout(loadStudents, 300)
    return () => clearTimeout(timeoutId)
  }, [studentSearch])

  // Filter and sort students for display
  const filteredStudents = useMemo(() => {
    return allStudents.sort((a, b) => {
      // Sort alphabetically by last name
      const nameA = `${a.lastName} ${a.firstName}`
      const nameB = `${b.lastName} ${b.firstName}`
      return nameA.localeCompare(nameB)
    })
  }, [allStudents])

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
              {value.firstName} {value.lastName}
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
              placeholder="Search students..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="h-9"
              autoFocus
            />
          </div>

          {/* Students List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-5 w-5 border-2 border-[#0084ff] border-t-transparent rounded-full animate-spin"></div>
                  <span>{studentSearch ? 'Searching...' : 'Loading students...'}</span>
                </div>
              </div>
            ) : (
              <>
                {filteredStudents.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    {studentSearch ?
                      `No students found for "${studentSearch}"` :
                      "No students available"
                    }
                  </div>
                ) : (
                  <div className="p-1">
                    {filteredStudents.map((student) => (
                      <button
                        key={student._id || student.id}
                        onClick={() => {
                          onChange(student)
                          setIsOpen(false)
                          setStudentSearch("")
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-left",
                          (value?._id === student._id || value?.id === student.id) && "bg-muted"
                        )}
                      >
                        <Check
                          className={cn(
                            "h-4 w-4 shrink-0",
                            (value?._id === student._id || value?.id === student.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="truncate font-medium">
                            {student.firstName} {student.lastName}
                            {student.grade && <span className="text-muted-foreground ml-2">Grade {student.grade}</span>}
                          </div>
                          <div className="truncate text-xs text-muted-foreground">
                            {student.email}
                          </div>
                        </div>
                      </button>
                    ))}
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
