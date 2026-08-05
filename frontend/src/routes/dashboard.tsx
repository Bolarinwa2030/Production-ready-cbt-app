import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  Award,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  Trophy,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/portal/stat-card";
import { StatusBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  leaderboard,
  notifications,
  performanceTrend,
  practiceExams,
  recentResults,
  student,
  subjectPerformance,
  upcomingExams,
} from "@/data/student";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — Kaptio CBT" },
      { name: "description", content: "Your exam schedule, practice sets, recent scores, performance summary and leaderboard standing." },
      { property: "og:title", content: "Student Dashboard — Kaptio CBT" },
      { property: "og:description", content: "Upcoming exams, recent scores and performance analytics at a glance." },
    ],
  }),
  component: DashboardPage,
});

function formatDate(value?: string) {
  if (!value) return "Unscheduled";
  return new Date(value).toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function DashboardPage() {
  const unread = notifications.filter((n) => n.unread);

  return (
    <AppShell>
      {/* Welcome card */}
      <section className="overflow-hidden rounded-3xl bg-hero-gradient p-6 shadow-elevated sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0">
            <Badge variant="secondary" className="mb-3">
              {student.cohort} · {student.program}
            </Badge>
            <h1 className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
              Welcome back, {student.firstName}.
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
              You have {upcomingExams.length} scheduled sittings and {unread.length} unread updates.
              Your next exam opens {formatDate(upcomingExams[0]?.scheduledFor)}.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="secondary">
                <Link to="/exams">
                  Browse available exams
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/history">View exam history</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-primary-foreground/10 p-5 text-primary-foreground backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-primary-foreground/70">
              Overall readiness
            </p>
            <p className="mt-1 font-display text-4xl font-bold">78%</p>
            <Progress value={78} className="mt-3 h-2 bg-primary-foreground/20" />
            <p className="mt-3 text-xs text-primary-foreground/70">
              Based on your last 6 attempts across 5 subjects.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CalendarDays} label="Upcoming exams" value={String(upcomingExams.length)} hint="next 3 weeks" />
        <StatCard icon={Target} label="Average score" value="76%" trend={{ value: "6%", positive: true }} hint="vs last term" />
        <StatCard icon={CheckCircle2} label="Exams passed" value="4 of 5" hint="80% pass rate" />
        <StatCard icon={Flame} label="Practice streak" value="12 days" trend={{ value: "3 days", positive: true }} />
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* Upcoming exams */}
          <Card className="shadow-soft">
            <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <CardTitle>Upcoming exams</CardTitle>
                <CardDescription>Scheduled sittings you are registered for.</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/exams">View all</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-accent/40"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{exam.title}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>{exam.subject}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {exam.durationMinutes} min
                      </span>
                      <span>{exam.questionCount} questions</span>
                      <span>{formatDate(exam.scheduledFor)}</span>
                    </p>
                  </div>
                  <Button asChild size="sm" className="shrink-0">
                    <Link to="/exams/$examId/instructions" params={{ examId: exam.id }}>
                      Start
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance summary */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Performance summary</CardTitle>
              <CardDescription>Rolling average score and mastery per subject.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 lg:grid-cols-2">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceTrend} margin={{ left: -20, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                    <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
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
                      dataKey="score"
                      stroke="var(--color-chart-1)"
                      strokeWidth={2.5}
                      fill="url(#scoreFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance} margin={{ left: -20, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="subject" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                    <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      cursor={{ fill: "var(--color-muted)" }}
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 12,
                        color: "var(--color-popover-foreground)",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="score" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Practice exams */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Practice exams</CardTitle>
              <CardDescription>Untimed sets with instant explanations.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {practiceExams.map((exam) => (
                <div key={exam.id} className="rounded-xl border border-border p-4">
                  <p className="font-medium leading-snug">{exam.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {exam.questionCount} questions · {exam.difficulty}
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                    <Link to="/exams/$examId/instructions" params={{ examId: exam.id }}>
                      Practise now
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CalendarDays className="h-4 w-4 text-primary" />
                Exam calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                defaultMonth={new Date("2026-08-01")}
                selected={new Date("2026-08-08")}
                className="mx-auto w-full p-0"
              />
              <Separator className="my-4" />
              <ul className="space-y-3">
                {upcomingExams.map((exam) => (
                  <li key={exam.id} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{exam.title}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(exam.scheduledFor)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent scores */}
          <Card className="shadow-soft">
            <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <CardTitle className="text-base">Recent scores</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/history">All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentResults.slice(0, 4).map((result) => (
                <div key={result.id}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <p className="truncate text-sm font-medium">{result.examTitle}</p>
                    <StatusBadge status={result.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress value={result.scorePercent} className="h-1.5" />
                    <span className="shrink-0 text-xs font-semibold">{result.scorePercent}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="shadow-soft">
            <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-primary" />
                Notifications
              </CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/notifications">All</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex gap-3">
                  <span
                    className={
                      notification.unread
                        ? "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                        : "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/40"
                    }
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{notification.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="h-4 w-4 text-warning" />
                Cohort leaderboard
              </CardTitle>
              <CardDescription>Top performers this term.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={
                    entry.isCurrentUser
                      ? "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-primary/40 bg-primary/5 p-2"
                      : "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-2"
                  }
                >
                  <span className="w-5 shrink-0 text-sm font-semibold text-muted-foreground">
                    {entry.rank}
                  </span>
                  <div className="flex min-w-0 items-center gap-2">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="text-xs">{entry.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.cohort}</p>
                    </div>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                    <Award className="h-3.5 w-3.5 text-primary" />
                    {entry.score}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
