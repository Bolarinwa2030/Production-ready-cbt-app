import { Link } from "@tanstack/react-router";
import { Clock, FileQuestion, Repeat2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DifficultyBadge } from "@/components/portal/badges";
import type { Exam } from "@/data/student";

export function ExamCard({ exam }: { exam: Exam }) {
  const attemptsLeft = exam.attemptsAllowed - exam.attemptsUsed;

  return (
    <Card className="card-hover flex h-full flex-col shadow-soft">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{exam.subject}</Badge>
          <DifficultyBadge difficulty={exam.difficulty} />
          <Badge variant="outline" className="ml-auto">
            {exam.type}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-snug">{exam.title}</CardTitle>
        <p className="text-sm leading-relaxed text-muted-foreground">{exam.description}</p>
      </CardHeader>

      <CardContent className="mt-auto">
        <dl className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-muted/40 p-3 text-center">
          <div>
            <dt className="sr-only">Duration</dt>
            <Clock className="mx-auto h-4 w-4 text-muted-foreground" />
            <dd className="mt-1 text-sm font-semibold">{exam.durationMinutes}m</dd>
          </div>
          <div>
            <dt className="sr-only">Questions</dt>
            <FileQuestion className="mx-auto h-4 w-4 text-muted-foreground" />
            <dd className="mt-1 text-sm font-semibold">{exam.questionCount}</dd>
          </div>
          <div>
            <dt className="sr-only">Attempts left</dt>
            <Repeat2 className="mx-auto h-4 w-4 text-muted-foreground" />
            <dd className="mt-1 text-sm font-semibold">{attemptsLeft} left</dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full" disabled={attemptsLeft <= 0}>
          <Link to="/exams/$examId/instructions" params={{ examId: exam.id }}>
            <Play className="h-4 w-4" />
            {attemptsLeft > 0 ? "Start exam" : "No attempts left"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
