import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { auditLogs, type AuditSeverity } from "@/data/admin";

export const Route = createFileRoute("/admin/audit-logs")({
  head: () => ({
    meta: [
      { title: "Audit Logs — Kaptio CBT Admin" },
      {
        name: "description",
        content:
          "Immutable trail of administrative and security events with actor, target, IP address and severity filtering.",
      },
      { property: "og:title", content: "Audit Logs — Kaptio CBT Admin" },
      {
        property: "og:description",
        content: "Immutable trail of administrative and security events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuditLogsPage,
});

const severityTone: Record<AuditSeverity, string> = {
  Info: "bg-accent text-accent-foreground",
  Warning: "bg-warning/15 text-warning",
  Critical: "bg-destructive/15 text-destructive",
};

function AuditLogsPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("all");

  const filtered = useMemo(
    () =>
      auditLogs.filter((log) => {
        const matchesQuery =
          query.trim() === "" ||
          `${log.actor} ${log.action} ${log.target} ${log.institution} ${log.ip}`
            .toLowerCase()
            .includes(query.trim().toLowerCase());
        const matchesSeverity = severity === "all" || log.severity === severity;
        return matchesQuery && matchesSeverity;
      }),
    [query, severity],
  );

  return (
    <AdminShell
      title="Audit logs"
      description="Every privileged action recorded across the platform."
      actions={
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Export log
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {(["Info", "Warning", "Critical"] as AuditSeverity[]).map((level) => (
          <Card key={level} className="shadow-soft">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{level} events</p>
                <p className="mt-1 font-display text-2xl font-bold">
                  {auditLogs.filter((l) => l.severity === level).length}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${severityTone[level]}`}
              >
                {level}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 shadow-soft">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search actor, action, target or IP"
                className="pl-9"
                aria-label="Search audit logs"
              />
            </div>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger className="sm:w-44" aria-label="Filter by severity">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severities</SelectItem>
                <SelectItem value="Info">Info</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">Target</TableHead>
                  <TableHead className="hidden lg:table-cell">IP</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{log.actor}</p>
                      <Badge variant="outline" className="mt-1">
                        {log.actorRole}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{log.action}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {log.target}
                      <span className="block text-xs">{log.institution}</span>
                    </TableCell>
                    <TableCell className="hidden font-mono text-xs text-muted-foreground lg:table-cell">
                      {log.ip}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${severityTone[log.severity]}`}
                      >
                        {log.severity}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filtered.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No log entries match those filters.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
