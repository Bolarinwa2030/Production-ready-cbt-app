import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Pencil, Plus, Search, Upload } from "lucide-react";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { DifficultyBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { bankQuestions, questionSubjects } from "@/data/instructor";

export const Route = createFileRoute("/instructor/questions/")({
  head: () => ({
    meta: [
      { title: "Question Bank — Kaptio CBT Instructor" },
      {
        name: "description",
        content:
          "Search, filter and manage every question in your bank: multiple choice, true/false, short answer and essay items.",
      },
      { property: "og:title", content: "Question Bank — Kaptio CBT Instructor" },
      {
        property: "og:description",
        content: "Manage reusable exam questions across subjects, topics and difficulty levels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuestionBankPage,
});

function QuestionBankPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const visible = useMemo(
    () =>
      bankQuestions.filter((q) => {
        const matchesQuery =
          !query ||
          q.prompt.toLowerCase().includes(query.toLowerCase()) ||
          q.topic.toLowerCase().includes(query.toLowerCase());
        const matchesSubject = subject === "all" || q.subject === subject;
        const matchesDifficulty = difficulty === "all" || q.difficulty === difficulty;
        return matchesQuery && matchesSubject && matchesDifficulty;
      }),
    [query, subject, difficulty],
  );

  return (
    <InstructorShell
      title="Question bank"
      description="A reusable library of questions you can drop into any exam."
      actions={
        <>
          <Button variant="outline">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button asChild>
            <Link to="/instructor/questions/$questionId" params={{ questionId: "new" }}>
              <Plus className="h-4 w-4" />
              New question
            </Link>
          </Button>
        </>
      }
    >
      <Card className="mb-4 p-4 shadow-soft">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search prompts or topics"
              className="pl-9"
              aria-label="Search questions"
            />
          </div>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="md:w-52" aria-label="Filter by subject">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {questionSubjects.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="md:w-44" aria-label="Filter by difficulty">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-72">Question</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Used in</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>
                    <p className="max-w-xl truncate text-sm font-medium">{question.prompt}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {question.subject} · {question.topic}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {question.type}
                  </TableCell>
                  <TableCell>
                    <DifficultyBadge difficulty={question.difficulty} />
                  </TableCell>
                  <TableCell>{question.marks}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {question.usedInExams} exams
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{question.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link
                        to="/instructor/questions/$questionId"
                        params={{ questionId: question.id }}
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {visible.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No questions match those filters.
          </p>
        )}
      </Card>
    </InstructorShell>
  );
}
