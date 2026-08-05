import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Flag,
  ListChecks,
  PanelLeftClose,
  Save,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SubmitExamDialog } from "@/components/portal/submit-exam-dialog";
import { QuestionPalette } from "@/components/portal/question-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { getExam, questions } from "@/data/student";
import { examSession, useExamSession } from "@/lib/exam-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exams/$examId/take")({
  head: () => ({
    meta: [
      { title: "Exam in Progress — Kaptio CBT" },
      { name: "description", content: "Answer questions, flag items for review and track your remaining time in the Kaptio exam interface." },
      { property: "og:title", content: "Exam in Progress — Kaptio CBT" },
      { property: "og:description", content: "Focused, distraction-free exam delivery with autosave." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ExamInterfacePage,
});

function formatClock(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, "0")).join(":");
}

function ExamInterfacePage() {
  const { examId } = Route.useParams();
  const exam = getExam(examId);
  const navigate = useNavigate();
  const { answers, flagged } = useExamSession();

  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(exam.durationMinutes * 60);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const question = questions[index]!;
  const answeredCount = useMemo(
    () => questions.filter((item) => answers[item.id]).length,
    [answers],
  );
  const flaggedCount = questions.filter((item) => flagged[item.id]).length;
  const remaining = questions.length - answeredCount;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const lowTime = secondsLeft < 300;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-3 px-4 sm:px-6">
          <Sheet open={paletteOpen} onOpenChange={setPaletteOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="Open question navigator">
                <ListChecks className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto p-5">
              <SheetTitle className="mb-4">Question navigator</SheetTitle>
              <QuestionPalette
                current={index}
                onSelect={(next) => {
                  setIndex(next);
                  setPaletteOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{exam.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {exam.subject} · {questions.length} questions
            </p>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Badge variant="outline" className="hidden gap-1.5 sm:inline-flex">
              <Save className="h-3 w-3 text-success" />
              Autosaved
            </Badge>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 font-display text-sm font-bold tabular-nums",
                lowTime
                  ? "border-destructive/40 bg-destructive/10 text-destructive"
                  : "border-border bg-muted/60",
              )}
              role="timer"
              aria-live="off"
            >
              <Timer className="h-4 w-4" />
              {formatClock(secondsLeft)}
            </div>
            <ThemeToggle />
            <SubmitExamDialog
              answered={answeredCount}
              total={questions.length}
              flagged={flaggedCount}
              onConfirm={() => navigate({ to: "/results/$examId", params: { examId: exam.id } })}
              trigger={<Button className="shrink-0">Submit</Button>}
            />
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none" />
      </header>

      <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Questions</p>
              <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
            </div>
            <QuestionPalette current={index} onSelect={setIndex} />
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="secondary">
              Question {index + 1} of {questions.length}
            </Badge>
            <Badge variant="outline">{question.topic}</Badge>
            <span className="text-xs text-muted-foreground">
              {answeredCount} answered · {remaining} remaining · {flaggedCount} flagged
            </span>
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-6 sm:p-8">
              <h1 className="font-display text-xl font-semibold leading-relaxed sm:text-2xl">
                {question.prompt}
              </h1>

              <RadioGroup
                value={answers[question.id] ?? ""}
                onValueChange={(value) => examSession.answer(question.id, value)}
                className="mt-8 gap-3"
              >
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.id;
                  return (
                    <Label
                      key={option.id}
                      htmlFor={`${question.id}-${option.id}`}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-xl border p-4 text-base font-normal transition-colors",
                        selected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/40"
                          : "border-border hover:bg-accent/40",
                      )}
                    >
                      <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-muted text-xs font-semibold uppercase">
                        {option.id}
                      </span>
                      <span className="min-w-0">{option.label}</span>
                    </Label>
                  );
                })}
              </RadioGroup>

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  variant={flagged[question.id] ? "secondary" : "outline"}
                  onClick={() => examSession.toggleFlag(question.id)}
                >
                  <Flag
                    className={cn("h-4 w-4", flagged[question.id] && "fill-warning text-warning")}
                  />
                  {flagged[question.id] ? "Flagged for review" : "Flag for review"}
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIndex((value) => Math.max(0, value - 1))}
                    disabled={index === 0}
                    className="flex-1 sm:flex-none"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  {index === questions.length - 1 ? (
                    <Button asChild className="flex-1 sm:flex-none">
                      <Link to="/exams/$examId/review" params={{ examId: exam.id }}>
                        Review answers
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))}
                      className="flex-1 sm:flex-none"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {lowTime && (
            <p className="mt-4 flex items-center gap-2 text-sm text-destructive">
              <CircleAlert className="h-4 w-4" />
              Less than five minutes remain — unanswered questions will be marked as skipped.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
