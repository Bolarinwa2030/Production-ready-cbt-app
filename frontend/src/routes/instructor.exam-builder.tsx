import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Clock, Plus, Rocket, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { DifficultyBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bankQuestions } from "@/data/instructor";

export const Route = createFileRoute("/instructor/exam-builder")({
  head: () => ({
    meta: [
      { title: "Exam Builder — Kaptio CBT Instructor" },
      {
        name: "description",
        content:
          "Assemble an exam from your question bank: set duration, pass mark, attempts, proctoring rules and publish to a cohort.",
      },
      { property: "og:title", content: "Exam Builder — Kaptio CBT Instructor" },
      {
        property: "og:description",
        content: "Build, configure and publish computer-based exams in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExamBuilderPage,
});

function ExamBuilderPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Computer Science");
  const [cohort, setCohort] = useState("Cohort 12");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(60);
  const [passMark, setPassMark] = useState(50);
  const [attempts, setAttempts] = useState(1);
  const [shuffle, setShuffle] = useState(true);
  const [proctored, setProctored] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const selectedQuestions = useMemo(
    () => bankQuestions.filter((q) => selected.includes(q.id)),
    [selected],
  );
  const totalMarks = selectedQuestions.reduce((sum, q) => sum + q.marks, 0);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  return (
    <InstructorShell
      title="Exam builder"
      description="Pick questions, set the rules and publish to a cohort."
      actions={
        <>
          <Button variant="outline" onClick={() => toast.success("Draft saved")}>
            <Save className="h-4 w-4" />
            Save draft
          </Button>
          <Button
            onClick={() =>
              toast.success("Exam published", {
                description: `${selectedQuestions.length} questions · ${duration} minutes`,
              })
            }
            disabled={selectedQuestions.length === 0 || title.trim() === ""}
          >
            <Rocket className="h-4 w-4" />
            Publish exam
          </Button>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Exam details</CardTitle>
              <CardDescription>What students will see before they start.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="exam-title">Exam title</Label>
                <Input
                  id="exam-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Data Structures Final"
                />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Information Systems">Information Systems</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="General Studies">General Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cohort</Label>
                <Select value={cohort} onValueChange={setCohort}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cohort 10">Cohort 10</SelectItem>
                    <SelectItem value="Cohort 11">Cohort 11</SelectItem>
                    <SelectItem value="Cohort 12">Cohort 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="exam-description">Description</Label>
                <Textarea
                  id="exam-description"
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Summarise the scope of this assessment…"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Add questions</CardTitle>
              <CardDescription>
                {selectedQuestions.length} selected from a bank of {bankQuestions.length}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {bankQuestions.map((question) => {
                const isSelected = selected.includes(question.id);
                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => toggle(question.id)}
                    aria-pressed={isSelected}
                    className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 rounded-xl border p-4 text-left transition-colors ${
                      isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border ${
                        isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{question.prompt}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {question.subject} · {question.topic} · {question.type}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <DifficultyBadge difficulty={question.difficulty} />
                      <Badge variant="secondary">{question.marks} mk</Badge>
                    </span>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-soft xl:sticky xl:top-24">
            <CardHeader>
              <CardTitle className="text-base">Rules & summary</CardTitle>
              <CardDescription>Applied to every attempt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-3">
                  <p className="text-xs text-muted-foreground">Questions</p>
                  <p className="font-display text-xl font-bold">{selectedQuestions.length}</p>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <p className="text-xs text-muted-foreground">Total marks</p>
                  <p className="font-display text-xl font-bold">{totalMarks}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min={5}
                  value={duration}
                  onChange={(event) => setDuration(Number(event.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pass-mark">Pass mark (%)</Label>
                <Input
                  id="pass-mark"
                  type="number"
                  min={0}
                  max={100}
                  value={passMark}
                  onChange={(event) => setPassMark(Number(event.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attempts">Attempts allowed</Label>
                <Input
                  id="attempts"
                  type="number"
                  min={1}
                  value={attempts}
                  onChange={(event) => setAttempts(Number(event.target.value))}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="min-w-0 pr-3">
                  <p className="text-sm font-medium">Shuffle questions</p>
                  <p className="text-xs text-muted-foreground">Randomise order per student.</p>
                </div>
                <Switch checked={shuffle} onCheckedChange={setShuffle} aria-label="Shuffle questions" />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="min-w-0 pr-3">
                  <p className="text-sm font-medium">Proctored sitting</p>
                  <p className="text-xs text-muted-foreground">Require a device readiness check.</p>
                </div>
                <Switch checked={proctored} onCheckedChange={setProctored} aria-label="Proctored sitting" />
              </div>

              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Roughly {selectedQuestions.length ? Math.round(duration / selectedQuestions.length) : 0} min
                per question.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Selected questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {selectedQuestions.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nothing selected yet — pick questions from the bank.
                </p>
              )}
              {selectedQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-muted text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span className="min-w-0 truncate text-sm">{question.prompt}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remove question"
                    onClick={() => toggle(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {selectedQuestions.length > 0 && (
                <Button variant="outline" size="sm" className="w-full" onClick={() => setSelected([])}>
                  <Plus className="h-4 w-4 rotate-45" />
                  Clear selection
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </InstructorShell>
  );
}
