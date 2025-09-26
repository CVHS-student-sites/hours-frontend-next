"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Download, Calendar } from "lucide-react"
import Link from "next/link"

export default function StudentHoursPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock data - in real app this would come from API
  const hoursData = [
    {
      id: 1,
      date: "2024-01-15",
      organization: "Local Food Bank",
      hours: 4.0,
      status: "approved",
      description: "Sorted donations and helped with food distribution",
      supervisor: "Jane Smith",
      approvedDate: "2024-01-16",
    },
    {
      id: 2,
      date: "2024-01-12",
      organization: "Animal Shelter",
      hours: 3.5,
      status: "pending",
      description: "Walked dogs and cleaned kennels",
      supervisor: "Mike Johnson",
      approvedDate: null,
    },
    {
      id: 3,
      date: "2024-01-10",
      organization: "Community Garden",
      hours: 2.0,
      status: "approved",
      description: "Planted vegetables and maintained garden beds",
      supervisor: "Sarah Wilson",
      approvedDate: "2024-01-11",
    },
    {
      id: 4,
      date: "2024-01-08",
      organization: "Senior Center",
      hours: 5.0,
      status: "rejected",
      description: "Helped with activities and meal service",
      supervisor: "Tom Brown",
      approvedDate: null,
      rejectionReason: "Insufficient documentation provided",
    },
    {
      id: 5,
      date: "2024-01-05",
      organization: "Library",
      hours: 3.0,
      status: "approved",
      description: "Organized books and helped with reading program",
      supervisor: "Lisa Davis",
      approvedDate: "2024-01-06",
    },
  ]

  const filteredData = hoursData.filter((entry) => {
    const matchesSearch =
      entry.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalHours = hoursData
    .filter((entry) => entry.status === "approved")
    .reduce((sum, entry) => sum + entry.hours, 0)
  const pendingHours = hoursData
    .filter((entry) => entry.status === "pending")
    .reduce((sum, entry) => sum + entry.hours, 0)

  return (
    <AppShell showBottomTabs userRole="student">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <PageHeader
          title="My Service Hours"
          subtitle="Track and manage all your community service activities"
          action={
            <Button asChild className="bg-[#0084ff] hover:bg-[#0070e6] text-white">
              <Link href="/student/hours/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Hours
              </Link>
            </Button>
          }
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0084ff]">{totalHours} hours</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{pendingHours} hours</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hoursData.length} entries</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search organizations or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hours Table */}
        <Card>
          <CardHeader>
            <CardTitle>Service Hours Log</CardTitle>
            <CardDescription>All your community service entries and their approval status</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hours found</h3>
                <p className="text-muted-foreground mb-4 text-pretty">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Start logging your community service hours to see them here."}
                </p>
                <Button asChild className="bg-[#0084ff] hover:bg-[#0070e6] text-white">
                  <Link href="/student/hours/add">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Hours
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Supervisor</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{new Date(entry.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-balance">{entry.organization}</p>
                            <p className="text-sm text-muted-foreground text-pretty line-clamp-2">
                              {entry.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{entry.hours}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              entry.status === "approved"
                                ? "default"
                                : entry.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="capitalize"
                          >
                            {entry.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{entry.supervisor}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {entry.status === "pending" && (
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Entry
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
