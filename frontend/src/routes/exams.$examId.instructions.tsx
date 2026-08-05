import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Clock,
  FileQuestion,
  Repeat2,
  ShieldCheck,
  Target,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { DifficultyBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExam } from "@/data/student";

export const Route = createFileRoute("/exams/$examId/instructions")({
  head: () => ({
    meta: [
      { title: "Exam Instructions — Kaptio CBT" },
      { name: "description", content: "Read the exam rules, timing, attempt limits and question count before you begin your sitting." },
      { property: "og:title", content: "Exam Instructions — Kaptio CBT" },
      { property: "og:description", content: "Rules, timing and attempt limits for your exam sitting." },
    ],
  }),
  component: InstructionsPage,
});

const rules = [
  "Once started, the timer runs continuously and cannot be paused.",
  "Answers autosave the moment you select them — no manual saving required.",
  "You may flag questions for review and return to them before submitting.",
  "Switching tabs or leaving full screen is recorded in your integrity log.",
  "External materials, calculators and second devices are not permitted.",
  "The exam submits automatically when the timer reaches zero.",
];

function InstructionsPage() {
  const { examId } = Route.useParams();
  const exam = getExam(examId);
  const [agreed, setAgreed] = useState(false);
  const attemptsLeft = exam.attemptsAllowed - exam.attemptsUsed;

  return (
    <AppShell>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/exams">
          <ArrowLeft className="h-4 w-4" />
          Back to exams
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader className="gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <DifficultyBadge difficulty={exam.difficulty} />
                <span className="text-sm text-muted-foreground">{exam.subject}</span>
              </div>
              <CardTitle className="font-display text-2xl sm:text-3xl">{exam.title}</CardTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">{exam.description}</p>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-4">
                {[
                  { icon: Clock, label: "Duration", value: `${exam.durationMinutes} min` },
                  { icon: FileQuestion, label: "Questions", value: String(exam.questionCount) },
                  { icon: Repeat2, label: "Attempts", value: `${attemptsLeft} of ${exam.attemptsAllowed}` },
                  { icon: Target, label: "Pass mark", value: `${exam.passMark}%` },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-border p-4">
                    <item.icon className="h-4 w-4 text-primary" />
                    <dt className="mt-2 text-xs text-muted-foreground">{item.label}</dt>
                    <dd className="font-display text-lg font-bold">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Examination rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {rules.map((rule, index) => (
                  <li key={rule} className="flex gap-3 text-sm leading-relaxed">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Alert className="border-warning/40 bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertTitle>Before you begin</AlertTitle>
            <AlertDescription>
              Close other applications, confirm a stable connection and keep this tab focused for
              the full duration of the sitting.
            </AlertDescription>
          </Alert>
        </div>

        <Card className="h-fit shadow-soft lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-lg">Ready to start?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl bg-muted/50 p-4 text-sm">
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Time limit</span>
                <span className="font-semibold">{exam.durationMinutes} minutes</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Questions</span>
                <span className="font-semibold">{exam.questionCount}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Attempts left</span>
                <span className="font-semibold">{attemptsLeft}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(value) => setAgreed(value === true)}
                className="mt-0.5"
              />
              <Label htmlFor="agree" className="text-sm font-normal leading-relaxed text-muted-foreground">
                I have read the rules and agree to the academic integrity policy.
              </Label>
            </div>

            <Button asChild size="lg" className="w-full" disabled={!agreed}>
              <Link to="/exams/$examId/take" params={{ examId: exam.id }}>
                Start exam
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              The timer starts as soon as the first question loads.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
