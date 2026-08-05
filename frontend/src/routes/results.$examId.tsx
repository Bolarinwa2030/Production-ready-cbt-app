import { createFileRoute, Link } from "@tanstack/react-router";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowLeft, Award, CheckCircle2, Download, RotateCcw, XCircle } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ScoreRing } from "@/components/portal/score-ring";
import { StatusBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getExam, questions, subjectPerformance } from "@/data/student";
import { examSession, useExamSession } from "@/lib/exam-session";

export const Route = createFileRoute("/results/$examId")({
  head: () => ({
    meta: [
      { title: "Exam Result — Kaptio CBT" },
      { name: "description", content: "Your score, pass status, correct and incorrect answers, and per-topic performance breakdown." },
      { property: "og:title", content: "Exam Result — Kaptio CBT" },
      { property: "og:description", content: "Score, pass status and performance breakdown for your attempt." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const { examId } = Route.useParams();
  const exam = getExam(examId);
  const { answers } = useExamSession();

  const correct = questions.filter((q) => answers[q.id] === q.correctOptionId).length;
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const wrong = answeredCount - correct;
  const unanswered = questions.length - answeredCount;
  const score = Math.round((correct / questions.length) * 100);
  const passed = score >= exam.passMark;

  const breakdown = [
    { name: "Correct", value: correct, fill: "var(--color-success)" },
    { name: "Wrong", value: wrong, fill: "var(--color-destructive)" },
    { name: "Unanswered", value: unanswered, fill: "var(--color-muted-foreground)" },
  ];

  return (
    <AppShell>
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4">
        <Link to="/history">
          <ArrowLeft className="h-4 w-4" />
          Back to history
        </Link>
      </Button>

      <Card className="shadow-soft">
        <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
          <ScoreRing value={score} label={passed ? "Passed" : "Below pass mark"} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={passed ? "Passed" : "Failed"} />
              <span className="text-sm text-muted-foreground">Pass mark {exam.passMark}%</span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {exam.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {exam.subject} · {questions.length} questions · submitted just now
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <dt className="mt-2 text-xs text-muted-foreground">Correct answers</dt>
                <dd className="font-display text-xl font-bold">{correct}</dd>
              </div>
              <div className="rounded-xl border border-border p-4">
                <XCircle className="h-4 w-4 text-destructive" />
                <dt className="mt-2 text-xs text-muted-foreground">Wrong answers</dt>
                <dd className="font-display text-xl font-bold">{wrong}</dd>
              </div>
              <div className="rounded-xl border border-border p-4">
                <Award className="h-4 w-4 text-primary" />
                <dt className="mt-2 text-xs text-muted-foreground">Unanswered</dt>
                <dd className="font-display text-xl font-bold">{unanswered}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/exams/$examId/review" params={{ examId }}>
                  Review answers
                </Link>
              </Button>
              <Button variant="outline" onClick={() => examSession.reset()} asChild={false}>
                <RotateCcw className="h-4 w-4" />
                Retake exam
              </Button>
              <Button variant="ghost">
                <Download className="h-4 w-4" />
                Download report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Answer breakdown</CardTitle>
            <CardDescription>Distribution across this attempt.</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={breakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                  {breakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-popover-foreground)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Topic mastery</CardTitle>
            <CardDescription>Where to focus your next revision session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectPerformance.map((item) => (
              <div key={item.subject}>
                <div className="flex items-center justify-between text-sm">
                  <span>{item.subject}</span>
                  <span className="font-semibold">{item.score}%</span>
                </div>
                <Progress value={item.score} className="mt-2 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
