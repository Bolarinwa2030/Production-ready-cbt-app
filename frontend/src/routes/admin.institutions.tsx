import { createFileRoute } from "@tanstack/react-router";
import { Building2, Plus, Users } from "lucide-react";
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
import { institutions } from "@/data/admin";

export const Route = createFileRoute("/admin/institutions")({
  head: () => ({
    meta: [
      { title: "Institution Management — Kaptio CBT Admin" },
      {
        name: "description",
        content:
          "Onboard institutions, review plans and seat usage, and manage tenant status across the Kaptio CBT platform.",
      },
      { property: "og:title", content: "Institution Management — Kaptio CBT Admin" },
      {
        property: "og:description",
        content: "Plans, seat usage and tenant status for every institution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InstitutionsPage,
});

function InstitutionsPage() {
  const totalSeats = institutions.reduce((s, i) => s + i.seatLimit, 0);
  const usedSeats = institutions.reduce((s, i) => s + i.seatsUsed, 0);
  const exams = institutions.reduce((s, i) => s + i.examsDelivered, 0);

  return (
    <AdminShell
      title="Institution management"
      description="Tenants, subscription plans and licence consumption."
      actions={
        <Button>
          <Plus className="h-4 w-4" />
          Add institution
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Institutions" value={String(institutions.length)} icon={Building2} />
        <StatCard
          label="Seats used"
          value={`${usedSeats.toLocaleString()} / ${totalSeats.toLocaleString()}`}
          hint={`${Math.round((usedSeats / totalSeats) * 100)}% of licensed capacity`}
          icon={Users}
        />
        <StatCard
          label="Exams delivered"
          value={exams.toLocaleString()}
          hint="lifetime across tenants"
          icon={Building2}
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {institutions.map((inst) => (
          <Card key={inst.id} className="shadow-soft">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="truncate text-base">{inst.name}</CardTitle>
                  <CardDescription>
                    {inst.shortName} · {inst.country}
                  </CardDescription>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant="secondary">{inst.plan}</Badge>
                  <Badge variant="outline">{inst.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-border p-3">
                  <dt className="text-xs text-muted-foreground">Students</dt>
                  <dd className="mt-1 font-display text-lg font-bold">
                    {inst.students.toLocaleString()}
                  </dd>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <dt className="text-xs text-muted-foreground">Instructors</dt>
                  <dd className="mt-1 font-display text-lg font-bold">{inst.instructors}</dd>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <dt className="text-xs text-muted-foreground">Exams</dt>
                  <dd className="mt-1 font-display text-lg font-bold">
                    {inst.examsDelivered.toLocaleString()}
                  </dd>
                </div>
              </dl>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Seat usage</span>
                  <span>
                    {inst.seatsUsed.toLocaleString()} / {inst.seatLimit.toLocaleString()}
                  </span>
                </div>
                <Progress value={(inst.seatsUsed / inst.seatLimit) * 100} className="mt-2 h-1.5" />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span className="truncate">{inst.primaryContact}</span>
                <span>Renews {inst.renewsOn}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
                <Button variant="ghost" size="sm">
                  View usage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
