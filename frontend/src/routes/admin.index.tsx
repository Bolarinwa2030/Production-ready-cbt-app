import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Building2, ScrollText, ShieldCheck, Users } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { StatCard } from "@/components/portal/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  admin,
  auditLogs,
  growthSeries,
  incidents,
  institutions,
  platformServices,
  platformUsers,
} from "@/data/admin";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Kaptio CBT" },
      {
        name: "description",
        content:
          "Monitor platform growth, institutions, user accounts and live service health from the Kaptio CBT admin console.",
      },
      { property: "og:title", content: "Admin Dashboard — Kaptio CBT" },
      {
        property: "og:description",
        content: "Platform growth, institutions and live service health at a glance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminDashboard,
});

const severityTone: Record<string, string> = {
  Info: "bg-accent text-accent-foreground",
  Warning: "bg-warning/15 text-warning",
  Critical: "bg-destructive/15 text-destructive",
};

function AdminDashboard() {
  const totalStudents = institutions.reduce((sum, i) => sum + i.students, 0);
  const activeIncidents = incidents.filter((i) => i.status !== "Resolved").length;
  const degraded = platformServices.filter((s) => s.status !== "Operational").length;

  return (
    <AdminShell
      title={`Good evening, ${admin.firstName}`}
      description="Platform-wide overview across every institution on Kaptio CBT."
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/admin/audit-logs">
              <ScrollText className="h-4 w-4" />
              Audit logs
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/users">
              <Users className="h-4 w-4" />
              Manage users
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total learners"
          value={totalStudents.toLocaleString()}
          icon={Users}
          trend={{ value: "8.4%", positive: true }}
          hint="vs last month"
        />
        <StatCard
          label="Institutions"
          value={String(institutions.length)}
          hint={`${institutions.filter((i) => i.status === "Trial").length} on trial`}
          icon={Building2}
        />
        <StatCard
          label="Platform accounts"
          value={String(platformUsers.length)}
          hint={`${platformUsers.filter((u) => u.status === "Suspended").length} suspended`}
          icon={ShieldCheck}
        />
        <StatCard
          label="Service health"
          value={degraded === 0 ? "All good" : `${degraded} issues`}
          hint={`${activeIncidents} active incident${activeIncidents === 1 ? "" : "s"}`}
          icon={Activity}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Platform growth</CardTitle>
            <CardDescription>Active accounts across all institutions.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthSeries} margin={{ left: -8, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="adminGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-popover-foreground)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#adminGrowth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Seat utilisation</CardTitle>
            <CardDescription>Licensed seats consumed per institution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {institutions.map((inst) => (
              <div key={inst.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{inst.shortName}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {inst.plan} · {inst.country}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {inst.status}
                  </Badge>
                </div>
                <Progress value={(inst.seatsUsed / inst.seatLimit) * 100} className="mt-3 h-1.5" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {inst.seatsUsed.toLocaleString()}/{inst.seatLimit.toLocaleString()} seats
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">Recent activity</CardTitle>
              <CardDescription>Latest entries from the audit trail.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/audit-logs">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{log.action}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {log.actor} · {log.timestamp}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${severityTone[log.severity]}`}
                >
                  {log.severity}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">Open incidents</CardTitle>
              <CardDescription>Service disruptions needing attention.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/monitoring">Monitoring</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {incidents.map((inc) => (
              <div key={inc.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 truncate text-sm font-semibold">{inc.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${severityTone[inc.severity]}`}
                  >
                    {inc.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{inc.impact}</p>
                <p className="mt-2 text-xs text-muted-foreground">Started {inc.started}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
