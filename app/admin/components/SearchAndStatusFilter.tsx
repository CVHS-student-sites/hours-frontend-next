'use client'

import { useEffect, memo, useState, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface SearchAndStatusFilterProps {
  searchValue: string
  onSearchChange: (value: string) => void
  statusValue: string
  onStatusChange: (value: string) => void
  searchPlaceholder?: string
  showStatusFilter?: boolean
  statusOptions?: Array<{value: string, label: string}>
}

export const SearchAndStatusFilter = memo(function SearchAndStatusFilter({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  searchPlaceholder = 'Search...',
  showStatusFilter = true,
  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Active' },
    { value: 'pending', label: 'Pending' }
  ]
}: SearchAndStatusFilterProps) {
  // Use local state for immediate input updates
  const [localValue, setLocalValue] = useState(searchValue)
  const [debouncedLocalValue] = useDebounce(localValue, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Sync debounced local value to parent
  useEffect(() => {
    onSearchChange(debouncedLocalValue)
  }, [debouncedLocalValue, onSearchChange])

  // Sync parent changes back to local state (only when different from local to avoid loops)
  useEffect(() => {
    if (searchValue !== localValue && searchValue !== debouncedLocalValue) {
      setLocalValue(searchValue)
    }
  }, [searchValue, localValue, debouncedLocalValue])

  // Maintain focus after re-renders
  useEffect(() => {
    if (isFocused && inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus()
    }
  })

  return (
    <div className="mb-4 flex items-center space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder={searchPlaceholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10"
        />
      </div>
      {showStatusFilter && (
        <Select value={statusValue} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
})
