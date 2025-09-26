"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Download,
  Upload,
  Eye,
  Ban,
  CheckCircle,
  AlertTriangle,
  Users,
  Building2,
  Clock,
  GraduationCap,
  Calendar,
} from "lucide-react"

export default function AdminManagePage() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getCurrentSchoolYear = () => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    
    if (currentMonth >= 8) {
      return currentYear
    } else {
      return currentYear - 1
    }
  }

  const currentSchoolYear = getCurrentSchoolYear()
  const currentSchoolYearString = `${currentSchoolYear}-${currentSchoolYear + 1}`
  const previousSchoolYear = currentSchoolYear - 1
  const previousSchoolYearString = `${previousSchoolYear}-${previousSchoolYear + 1}`

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@student.cvhs.edu",
      role: "student",
      grade: "11th",
      graduationYear: currentSchoolYear + 2,
      status: "active",
      totalHours: 45.5,
      joinDate: "2023-09-01",
      lastActive: "2024-01-16",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@cvhs.edu",
      role: "supervisor",
      organization: "Local Food Bank",
      status: "active",
      studentsSupervised: 23,
      joinDate: "2023-08-15",
      lastActive: "2024-01-16",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah.wilson@student.cvhs.edu",
      role: "student",
      grade: "12th",
      graduationYear: currentSchoolYear + 1,
      status: "active",
      totalHours: 62.0,
      joinDate: "2023-09-01",
      lastActive: "2024-01-15",
    },
    {
      id: 4,
      name: "Mike Johnson",
      email: "mike.johnson@cvhs.edu",
      role: "supervisor",
      organization: "Animal Shelter",
      status: "pending",
      studentsSupervised: 0,
      joinDate: "2024-01-10",
      lastActive: "2024-01-12",
    },
    {
      id: 5,
      name: "Emma Brown",
      email: "emma.brown@graduated.cvhs.edu",
      role: "student",
      grade: "Graduated",
      graduationYear: previousSchoolYear + 1,
      status: "active",
      totalHours: 78.5,
      joinDate: "2022-09-01",
      lastActive: "2024-06-15",
    },
    {
      id: 6,
      name: "Alex Chen",
      email: "alex.chen@graduated.cvhs.edu", 
      role: "student",
      grade: "Graduated",
      graduationYear: previousSchoolYear + 1,
      status: "active",
      totalHours: 55.0,
      joinDate: "2022-09-01",
      lastActive: "2024-05-30",
    },
    {
      id: 7,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@student.cvhs.edu",
      role: "student",
      grade: "10th",
      graduationYear: currentSchoolYear + 3,
      status: "active",
      totalHours: 22.5,
      joinDate: "2024-09-01",
      lastActive: "2024-01-16",
    },
  ]

  const organizations = [
    {
      id: 1,
      name: "Local Food Bank",
      supervisor: "Jane Smith",
      activeStudents: 23,
      totalHours: 456,
      status: "active",
    },
    {
      id: 2,
      name: "Animal Shelter",
      supervisor: "Mike Johnson",
      activeStudents: 15,
      totalHours: 234,
      status: "active",
    },
    {
      id: 3,
      name: "Senior Center",
      supervisor: "Lisa Davis",
      activeStudents: 12,
      totalHours: 189,
      status: "active",
    },
  ]

  const serviceHours = [
    {
      id: 1,
      student: "John Doe",
      organization: "Local Food Bank",
      hours: 4.0,
      date: "2024-01-15",
      status: "approved",
      supervisor: "Jane Smith",
    },
    {
      id: 2,
      student: "Sarah Wilson",
      organization: "Animal Shelter",
      hours: 3.5,
      date: "2024-01-14",
      status: "pending",
      supervisor: "Mike Johnson",
    },
    {
      id: 3,
      student: "Alex Chen",
      organization: "Senior Center",
      hours: 12.0,
      date: "2024-01-13",
      status: "flagged",
      supervisor: "Lisa Davis",
      flag: "Unusually high hours",
    },
  ]

  // Helper functions for senior data management
  const getGraduatedSeniors = () => {
    return users.filter(user => 
      user.role === "student" && 
      user.graduationYear && 
      user.graduationYear <= previousSchoolYear + 1
    )
  }

  const handleDeleteGraduatedSeniors = () => {
    const graduatedSeniors = getGraduatedSeniors()
    // In a real app, this would make an API call to delete the users
    console.log(`Would delete ${graduatedSeniors.length} graduated senior records:`, graduatedSeniors)
    // For demo purposes, we'll just log this
    // You would implement the actual deletion logic here
  }

  const graduatedSeniors = getGraduatedSeniors()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId])
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  return (
    <AppShell showBottomTabs userRole="admin">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <PageHeader
          title="Data Management"
          subtitle="Manage users, organizations, and service hour records"
          action={
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          }
        />

  
        {/* Senior Data Cleanup Section */}
        {graduatedSeniors.length > 0 && (
          <Card className="mb-6 bg-card/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted/30 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-[#0084ff]" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">End of Year Cleanup</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Found {graduatedSeniors.length} graduated senior{graduatedSeniors.length !== 1 ? 's' : ''} from {previousSchoolYearString}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    <Calendar className="mr-1 h-3 w-3" />
                    {previousSchoolYearString}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">Cleanup Graduated Senior Data</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Remove data for seniors who graduated in {previousSchoolYearString} to keep the system clean and organized.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Current school year: {currentSchoolYearString}
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="border-border hover:bg-muted/50">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clean Up Data ({graduatedSeniors.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <span>Delete Graduated Senior Data?</span>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-3">
                        <p>
                          This will permanently delete data for <strong>{graduatedSeniors.length} graduated senior{graduatedSeniors.length !== 1 ? 's' : ''}</strong> from the {previousSchoolYearString} school year.
                        </p>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Students to be deleted:</p>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {graduatedSeniors.map((student) => (
                              <div key={student.id} className="text-sm text-foreground flex justify-between">
                                <span>{student.name}</span>
                                <span className="text-muted-foreground">{student.totalHours}h</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Note:</strong> This action cannot be undone. Make sure you have exported any necessary data before proceeding.
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteGraduatedSeniors}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete {graduatedSeniors.length} Student{graduatedSeniors.length !== 1 ? 's' : ''}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="organizations" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organizations
            </TabsTrigger>
            <TabsTrigger value="hours" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Service Hours
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage student and supervisor accounts</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-[#0084ff] hover:bg-[#0070e6] text-white">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a new student or supervisor account</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john.doe@cvhs.edu" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="supervisor">Supervisor</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-[#0084ff] hover:bg-[#0070e6] text-white">Create User</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="supervisor">Supervisors</SelectItem>
                      <SelectItem value="admin">Administrators</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                  <div className="flex items-center space-x-2 mb-4 p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">{selectedUsers.length} users selected</span>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Activate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Ban className="mr-2 h-4 w-4" />
                      Suspend
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                )}

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" alt={user.name} />
                                <AvatarFallback className="bg-[#0084ff] text-white text-xs">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-balance">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {user.role}
                            </Badge>
                            {user.role === "student" && user.grade && (
                              <div className="mt-1">
                                <p className="text-xs text-muted-foreground">{user.grade}</p>
                                {user.graduationYear && (
                                  <p className="text-xs text-muted-foreground">
                                    Class of {user.graduationYear}
                                    {user.graduationYear <= previousSchoolYear + 1 && (
                                      <span className="ml-1 text-[#0084ff] font-medium">• Graduated</span>
                                    )}
                                  </p>
                                )}
                              </div>
                            )}
                            {user.role === "supervisor" && user.organization && (
                              <p className="text-xs text-muted-foreground mt-1">{user.organization}</p>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="capitalize"
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.role === "student" && (
                              <div>
                                <p className="text-sm font-medium">{user.totalHours}h</p>
                                <p className="text-xs text-muted-foreground">total hours</p>
                              </div>
                            )}
                            {user.role === "supervisor" && (
                              <div>
                                <p className="text-sm font-medium">{user.studentsSupervised}</p>
                                <p className="text-xs text-muted-foreground">students</p>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </TableCell>
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
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organizations Tab */}
          <TabsContent value="organizations">
            <Card>
              <CardHeader>
                <CardTitle>Organization Management</CardTitle>
                <CardDescription>Manage volunteer organizations and their supervisors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizations.map((org) => (
                    <div key={org.id} className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-balance">{org.name}</h3>
                          <p className="text-sm text-muted-foreground">Supervisor: {org.supervisor}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="flex items-center">
                              <Users className="mr-1 h-3 w-3" />
                              {org.activeStudents} students
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {org.totalHours} hours
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={org.status === "active" ? "default" : "secondary"} className="capitalize">
                            {org.status}
                          </Badge>
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
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Organization
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service Hours Tab */}
          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle>Service Hours Management</CardTitle>
                <CardDescription>Review and manage all service hour entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Supervisor</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {serviceHours.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.student}</TableCell>
                          <TableCell>{entry.organization}</TableCell>
                          <TableCell>{entry.hours}</TableCell>
                          <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
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
                              {entry.status === "flagged" && entry.flag && (
                                <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  {entry.flag}
                                </Badge>
                              )}
                            </div>
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
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Entry
                                </DropdownMenuItem>
                                {entry.status === "flagged" && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Resolve Flag
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
