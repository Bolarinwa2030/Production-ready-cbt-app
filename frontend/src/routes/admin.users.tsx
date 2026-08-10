import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { platformUsers, type PlatformUser } from "@/data/admin";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management — Kaptio CBT Admin" },
      {
        name: "description",
        content:
          "Search, filter, invite and suspend student, instructor and administrator accounts across every institution.",
      },
      { property: "og:title", content: "User Management — Kaptio CBT Admin" },
      {
        property: "og:description",
        content: "Manage every student, instructor and administrator account on the platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UserManagementPage,
});

function statusVariant(status: PlatformUser["status"]) {
  if (status === "Active") return "bg-success/15 text-success";
  if (status === "Invited") return "bg-accent text-accent-foreground";
  return "bg-destructive/15 text-destructive";
}

function UserManagementPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(
    () =>
      platformUsers.filter((user) => {
        const matchesQuery =
          query.trim() === "" ||
          `${user.name} ${user.email} ${user.institution}`
            .toLowerCase()
            .includes(query.trim().toLowerCase());
        const matchesRole = role === "all" || user.role === role;
        const matchesStatus = status === "all" || user.status === status;
        return matchesQuery && matchesRole && matchesStatus;
      }),
    [query, role, status],
  );

  return (
    <AdminShell
      title="User management"
      description="Every account across all institutions on the platform."
      actions={
        <>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button>
            <UserPlus className="h-4 w-4" />
            Invite user
          </Button>
        </>
      }
    >
      <Card className="shadow-soft">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email or institution"
                className="pl-9"
                aria-label="Search users"
              />
            </div>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="sm:w-48" aria-label="Filter by role">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Instructor">Instructor</SelectItem>
                <SelectItem value="Institution Admin">Institution Admin</SelectItem>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="sm:w-40" aria-label="Filter by status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Invited">Invited</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Institution</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">MFA</TableHead>
                  <TableHead className="hidden lg:table-cell">Last active</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-accent text-xs text-accent-foreground">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{user.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {user.institution}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusVariant(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {user.mfaEnabled ? "Enabled" : "Off"}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {user.lastActive}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`Actions for ${user.name}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem>View profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit role</DropdownMenuItem>
                          <DropdownMenuItem>Reset password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            {user.status === "Suspended" ? "Reinstate" : "Suspend"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filtered.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No users match those filters.
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Showing {filtered.length} of {platformUsers.length} accounts
          </p>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
