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
import { ClipboardCheck, FilePlus2, Library, Users } from "lucide-react";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { StatCard } from "@/components/portal/stat-card";
import { StatusBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  bankQuestions,
  cohortPerformance,
  instructor,
  managedExams,
  submissions,
} from "@/data/instructor";

export const Route = createFileRoute("/instructor/")({
  head: () => ({
    meta: [
      { title: "Instructor Dashboard — Kaptio CBT" },
      {
        name: "description",
        content:
          "Track cohort performance, live exams, pending grading and question bank activity from one instructor dashboard.",
      },
      { property: "og:title", content: "Instructor Dashboard — Kaptio CBT" },
      {
        property: "og:description",
        content: "Cohort performance, live exams and pending grading at a glance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InstructorDashboard,
});

function InstructorDashboard() {
  const needsReview = submissions.filter((s) => s.grading === "Needs review").length;
  const totalSubmissions = managedExams.reduce((sum, exam) => sum + exam.submissions, 0);

  return (
    <InstructorShell
      title={`Welcome back, ${instructor.firstName}`}
      description="Here is how your cohorts are performing this week."
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/instructor/questions">
              <Library className="h-4 w-4" />
              Question bank
            </Link>
          </Button>
          <Button asChild>
            <Link to="/instructor/exam-builder">
              <FilePlus2 className="h-4 w-4" />
              Create exam
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active exams"
          value={String(managedExams.filter((e) => e.status !== "Draft").length)}
          hint="across 3 cohorts"
          icon={ClipboardCheck}
        />
        <StatCard
          label="Submissions"
          value={String(totalSubmissions)}
          icon={Users}
          trend={{ value: "12%", positive: true }}
          hint="vs last month"
        />
        <StatCard
          label="Questions in bank"
          value={String(bankQuestions.length)}
          hint={`${bankQuestions.filter((q) => q.status === "Draft").length} drafts`}
          icon={Library}
        />
        <StatCard
          label="Awaiting grading"
          value={String(needsReview)}
          hint="manual review needed"
          icon={ClipboardCheck}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Cohort average over time</CardTitle>
            <CardDescription>Mean score across all managed exams.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cohortPerformance} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="instructorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[40, 100]} />
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
                  dataKey="average"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#instructorAvg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Your exams</CardTitle>
            <CardDescription>Status and completion rate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {managedExams.map((exam) => (
              <div key={exam.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{exam.title}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {exam.cohort} · {exam.questions} questions
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {exam.status}
                  </Badge>
                </div>
                <Progress
                  value={exam.enrolled ? (exam.submissions / exam.enrolled) * 100 : 0}
                  className="mt-3 h-1.5"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {exam.submissions}/{exam.enrolled} submitted
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">Latest submissions</CardTitle>
            <CardDescription>Most recent student attempts.</CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/instructor/results">View all</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {submissions.slice(0, 5).map((sub) => (
            <div
              key={sub.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border p-4"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-accent text-xs text-accent-foreground">
                  {sub.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{sub.student}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {sub.examTitle} · {sub.cohort}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-display text-sm font-bold">{sub.scorePercent}%</span>
                <StatusBadge status={sub.status} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </InstructorShell>
  );
}
