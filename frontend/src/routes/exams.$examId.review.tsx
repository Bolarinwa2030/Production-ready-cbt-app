import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmitExamDialog } from "@/components/portal/submit-exam-dialog";
import { getExam, questions } from "@/data/student";
import { useExamSession } from "@/lib/exam-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exams/$examId/review")({
  head: () => ({
    meta: [
      { title: "Review Answers — Kaptio CBT" },
      { name: "description", content: "Review every answer, revisit flagged questions and confirm nothing is left unanswered before submitting." },
      { property: "og:title", content: "Review Answers — Kaptio CBT" },
      { property: "og:description", content: "Check answered, unanswered and flagged questions before submission." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReviewPage,
});

function ReviewPage() {
  const { examId } = Route.useParams();
  const exam = getExam(examId);
  const navigate = useNavigate();
  const { answers, flagged } = useExamSession();
  const [filter, setFilter] = useState<"all" | "answered" | "unanswered" | "flagged">("all");

  const answered = questions.filter((q) => answers[q.id]).length;
  const flaggedCount = questions.filter((q) => flagged[q.id]).length;

  const visible = questions.filter((question) => {
    if (filter === "answered") return Boolean(answers[question.id]);
    if (filter === "unanswered") return !answers[question.id];
    if (filter === "flagged") return Boolean(flagged[question.id]);
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4">
          <Link to="/exams/$examId/take" params={{ examId }}>
            <ArrowLeft className="h-4 w-4" />
            Back to exam
          </Link>
        </Button>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Review your answers
            </h1>
            <p className="mt-1 truncate text-sm text-muted-foreground">{exam.title}</p>
          </div>
          <SubmitExamDialog
            answered={answered}
            total={questions.length}
            flagged={flaggedCount}
            onConfirm={() => navigate({ to: "/results/$examId", params: { examId } })}
            trigger={<Button size="lg">Submit exam</Button>}
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Answered", value: answered, tone: "text-success" },
            { label: "Unanswered", value: questions.length - answered, tone: "text-destructive" },
            { label: "Flagged", value: flaggedCount, tone: "text-warning" },
          ].map((item) => (
            <Card key={item.label} className="shadow-soft">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className={cn("mt-1 font-display text-2xl font-bold", item.tone)}>{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)} className="mt-8">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="answered">Answered</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="mt-4 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">
              {visible.length} question{visible.length === 1 ? "" : "s"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {visible.map((question, position) => {
              const selected = answers[question.id];
              const selectedOption = question.options.find((option) => option.id === selected);
              return (
                <div
                  key={question.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 rounded-xl border border-border p-4"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-sm font-semibold">
                    {question.number}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{question.prompt}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {selectedOption
                        ? `Your answer: ${selectedOption.id.toUpperCase()} — ${selectedOption.label}`
                        : "Not answered yet"}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    {selected ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/50" />
                    )}
                    {flagged[question.id] && (
                      <Badge variant="outline" className="gap-1 border-warning/40 text-warning">
                        <Flag className="h-3 w-3" />
                        Flagged
                      </Badge>
                    )}
                  </div>
                  <span className="sr-only">Question {position + 1}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
