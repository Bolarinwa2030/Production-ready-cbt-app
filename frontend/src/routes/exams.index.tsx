import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ExamCard } from "@/components/portal/exam-card";
import { DifficultyBadge } from "@/components/portal/badges";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { exams } from "@/data/student";

export const Route = createFileRoute("/exams/")({
  head: () => ({
    meta: [
      { title: "Available Exams — Kaptio CBT" },
      { name: "description", content: "Browse every exam and practice set available to you, with duration, question count and difficulty." },
      { property: "og:title", content: "Available Exams — Kaptio CBT" },
      { property: "og:description", content: "Browse exams by subject, difficulty and duration." },
    ],
  }),
  component: ExamsPage,
});

function ExamsPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  const subjects = useMemo(() => Array.from(new Set(exams.map((e) => e.subject))), []);

  const filtered = exams.filter((exam) => {
    const matchesQuery =
      exam.title.toLowerCase().includes(query.toLowerCase()) ||
      exam.subject.toLowerCase().includes(query.toLowerCase());
    const matchesSubject = subject === "all" || exam.subject === subject;
    const matchesDifficulty = difficulty === "all" || exam.difficulty === difficulty;
    return matchesQuery && matchesSubject && matchesDifficulty;
  });

  return (
    <AppShell
      title="Available exams"
      description="Everything you are eligible to sit, including untimed practice sets."
      actions={
        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "table" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setView("table")}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      <Card className="mb-6 p-4 shadow-soft">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by exam or subject"
              className="pl-9"
              aria-label="Search exams"
            />
          </div>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger aria-label="Filter by subject">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {subjects.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger aria-label="Filter by difficulty">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All difficulties</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center shadow-soft">
          <p className="font-display text-lg font-semibold">No exams match your filters</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try clearing the search or choosing a different subject.
          </p>
        </Card>
      ) : view === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell className="text-muted-foreground">{exam.subject}</TableCell>
                    <TableCell>{exam.durationMinutes} min</TableCell>
                    <TableCell>{exam.questionCount}</TableCell>
                    <TableCell>
                      <DifficultyBadge difficulty={exam.difficulty} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm">
                        <Link to="/exams/$examId/instructions" params={{ examId: exam.id }}>
                          Start
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </AppShell>
  );
}
