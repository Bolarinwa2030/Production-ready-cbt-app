import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, AlertTriangle, Gauge, RefreshCw } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { StatCard } from "@/components/portal/stat-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { incidents, platformServices, trafficSeries, type ServiceStatus } from "@/data/admin";

export const Route = createFileRoute("/admin/monitoring")({
  head: () => ({
    meta: [
      { title: "Platform Monitoring — Kaptio CBT Admin" },
      {
        name: "description",
        content:
          "Live service health, uptime, latency and incident tracking for every Kaptio CBT platform component.",
      },
      { property: "og:title", content: "Platform Monitoring — Kaptio CBT Admin" },
      {
        property: "og:description",
        content: "Live uptime, latency and incident tracking across platform services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MonitoringPage,
});

const statusTone: Record<ServiceStatus, string> = {
  Operational: "bg-success/15 text-success",
  Degraded: "bg-warning/15 text-warning",
  Outage: "bg-destructive/15 text-destructive",
};

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-popover-foreground)",
  fontSize: 12,
};

function MonitoringPage() {
  const peak = Math.max(...trafficSeries.map((t) => t.sessions));
  const errors = trafficSeries.reduce((s, t) => s + t.errors, 0);
  const avgLatency = Math.round(
    platformServices.reduce((s, x) => s + x.latencyMs, 0) / platformServices.length,
  );

  return (
    <AdminShell
      title="Platform monitoring"
      description="Real-time health of every service powering Kaptio CBT."
      actions={
        <Button variant="outline">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Peak concurrent sessions" value={peak.toLocaleString()} icon={Activity} />
        <StatCard label="Avg response time" value={`${avgLatency} ms`} icon={Gauge} />
        <StatCard
          label="Errors (24h)"
          value={String(errors)}
          icon={AlertTriangle}
          trend={{ value: "3%", positive: false }}
          hint="vs yesterday"
        />
        <StatCard
          label="Services healthy"
          value={`${platformServices.filter((s) => s.status === "Operational").length}/${platformServices.length}`}
          icon={Activity}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Session traffic (24h)</CardTitle>
            <CardDescription>Concurrent exam sessions by time of day.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficSeries} margin={{ left: -12, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Errors by window</CardTitle>
            <CardDescription>Failed requests grouped in 4-hour buckets.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSeries} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                <Bar dataKey="errors" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Service status</CardTitle>
            <CardDescription>Uptime and latency for each component.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {platformServices.map((service) => (
              <div
                key={service.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{service.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {service.region} · {service.uptime} uptime ·{" "}
                    {service.latencyMs ? `${service.latencyMs} ms` : "unavailable"}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[service.status]}`}
                >
                  {service.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Incident timeline</CardTitle>
            <CardDescription>Recent disruptions and their state.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {incidents.map((inc) => (
              <div key={inc.id} className="border-l-2 border-border pl-4">
                <p className="text-sm font-semibold">{inc.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{inc.impact}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {inc.started} · {inc.status}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
