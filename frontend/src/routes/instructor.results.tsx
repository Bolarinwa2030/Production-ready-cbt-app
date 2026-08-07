import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Eye, Search } from "lucide-react";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { StatusBadge } from "@/components/portal/badges";
import { StatCard } from "@/components/portal/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, ClipboardList, Percent } from "lucide-react";
import { submissions } from "@/data/instructor";

export const Route = createFileRoute("/instructor/results")({
  head: () => ({
    meta: [
      { title: "Student Results — Kaptio CBT Instructor" },
      {
        name: "description",
        content:
          "Review every student submission with score, duration, pass status and grading state across your exams.",
      },
      { property: "og:title", content: "Student Results — Kaptio CBT Instructor" },
      {
        property: "og:description",
        content: "Submissions, scores and grading status for all your cohorts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentResultsPage,
});

function StudentResultsPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "passed" | "failed" | "review">("all");

  const visible = useMemo(
    () =>
      submissions.filter((sub) => {
        const matchesQuery =
          !query ||
          sub.student.toLowerCase().includes(query.toLowerCase()) ||
          sub.examTitle.toLowerCase().includes(query.toLowerCase());
        const matchesTab =
          tab === "all" ||
          (tab === "passed" && sub.status === "Passed") ||
          (tab === "failed" && sub.status === "Failed") ||
          (tab === "review" && sub.grading === "Needs review");
        return matchesQuery && matchesTab;
      }),
    [query, tab],
  );

  const passRate = Math.round(
    (submissions.filter((s) => s.status === "Passed").length / submissions.length) * 100,
  );
  const average = Math.round(
    submissions.reduce((sum, s) => sum + s.scorePercent, 0) / submissions.length,
  );

  return (
    <InstructorShell
      title="Student results"
      description="Every submission across your exams, with grading status."
      actions={
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Submissions" value={String(submissions.length)} icon={ClipboardList} />
        <StatCard label="Pass rate" value={`${passRate}%`} icon={CheckCircle2} />
        <StatCard label="Average score" value={`${average}%`} icon={Percent} />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search student or exam"
            className="max-w-md pl-9"
            aria-label="Search results"
          />
        </div>
        <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="passed">Passed</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
            <TabsTrigger value="review">Needs review</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="mt-4 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="min-w-40">Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Grading</TableHead>
                <TableHead className="text-right">Script</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-accent text-xs text-accent-foreground">
                          {sub.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{sub.student}</p>
                        <p className="truncate text-xs text-muted-foreground">{sub.studentId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{sub.examTitle}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(sub.submittedAt).toLocaleString(undefined, {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{sub.durationUsed}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={sub.scorePercent} className="h-1.5 w-24" />
                      <span className="text-sm font-semibold">{sub.scorePercent}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={sub.status} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        sub.grading === "Needs review" ? "border-warning/40 text-warning" : undefined
                      }
                    >
                      {sub.grading}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {visible.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">No submissions match.</p>
        )}
      </Card>
    </InstructorShell>
  );
}
