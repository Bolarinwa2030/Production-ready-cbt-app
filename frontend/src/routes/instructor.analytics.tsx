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
import { Activity, Percent, TrendingUp, Users } from "lucide-react";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { StatCard } from "@/components/portal/stat-card";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cohortPerformance, scoreDistribution, topicDifficulty } from "@/data/instructor";

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-popover-foreground)",
  fontSize: 12,
};

export const Route = createFileRoute("/instructor/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Kaptio CBT Instructor" },
      {
        name: "description",
        content:
          "Score distribution, cohort trends and topic-level difficulty analysis to see exactly where students struggle.",
      },
      { property: "og:title", content: "Analytics — Kaptio CBT Instructor" },
      {
        property: "og:description",
        content: "Score distribution, cohort trends and per-topic difficulty insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const totalStudents = scoreDistribution.reduce((sum, band) => sum + band.students, 0);

  return (
    <InstructorShell
      title="Analytics"
      description="Understand performance patterns across cohorts, exams and topics."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Students assessed" value={String(totalStudents)} icon={Users} />
        <StatCard
          label="Mean score"
          value="76%"
          icon={Percent}
          trend={{ value: "3 pts", positive: true }}
          hint="vs last month"
        />
        <StatCard label="Completion rate" value="92%" icon={Activity} hint="started vs submitted" />
        <StatCard
          label="Hardest topic"
          value="Concurrency"
          icon={TrendingUp}
          hint="48% correct rate"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Score distribution</CardTitle>
            <CardDescription>How students cluster across score bands.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="band" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                <Bar dataKey="students" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Submissions per month</CardTitle>
            <CardDescription>Assessment volume across the semester.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortPerformance} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="submissions"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="var(--color-info)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Topic difficulty</CardTitle>
          <CardDescription>
            Correct-answer rate per topic — the lowest bars need more teaching time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {topicDifficulty.map((item) => (
            <div key={item.topic}>
              <div className="flex items-center justify-between text-sm">
                <span>{item.topic}</span>
                <span className="font-semibold">{item.correctRate}%</span>
              </div>
              <Progress value={item.correctRate} className="mt-2 h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </InstructorShell>
  );
}
