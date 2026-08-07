import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { Button } from "@/components/ui/button";
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
import { getBankQuestion, questionSubjects } from "@/data/instructor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/instructor/questions/$questionId")({
  head: () => ({
    meta: [
      { title: "Question Editor — Kaptio CBT Instructor" },
      {
        name: "description",
        content:
          "Write the prompt, set answer options, mark the correct choice and add an explanation for a bank question.",
      },
      { property: "og:title", content: "Question Editor — Kaptio CBT Instructor" },
      {
        property: "og:description",
        content: "Author and edit exam questions with options, marks and explanations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: QuestionEditorPage,
});

const blankOptions = [
  { id: "a", label: "" },
  { id: "b", label: "" },
  { id: "c", label: "" },
  { id: "d", label: "" },
];

function QuestionEditorPage() {
  const { questionId } = Route.useParams();
  const navigate = useNavigate();
  const isNew = questionId === "new";
  const source = getBankQuestion(questionId);

  const [prompt, setPrompt] = useState(isNew ? "" : source.prompt);
  const [subject, setSubject] = useState(isNew ? questionSubjects[0]! : source.subject);
  const [topic, setTopic] = useState(isNew ? "" : source.topic);
  const [type, setType] = useState(isNew ? "Multiple choice" : source.type);
  const [difficulty, setDifficulty] = useState(isNew ? "Intermediate" : source.difficulty);
  const [marks, setMarks] = useState(isNew ? 1 : source.marks);
  const [explanation, setExplanation] = useState(isNew ? "" : source.explanation);
  const [published, setPublished] = useState(isNew ? false : source.status === "Published");
  const [options, setOptions] = useState(
    isNew || source.options.length === 0 ? blankOptions : source.options,
  );
  const [correctOptionId, setCorrectOptionId] = useState(
    isNew ? "a" : source.correctOptionId || "a",
  );

  const showOptions = type === "Multiple choice" || type === "True / False";

  function updateOption(id: string, label: string) {
    setOptions((prev) => prev.map((option) => (option.id === id ? { ...option, label } : option)));
  }

  function addOption() {
    const nextId = String.fromCharCode(97 + options.length);
    setOptions((prev) => [...prev, { id: nextId, label: "" }]);
  }

  function removeOption(id: string) {
    setOptions((prev) => prev.filter((option) => option.id !== id));
  }

  function save() {
    toast.success(isNew ? "Question created" : "Question saved", {
      description: "Changes are held in the UI until the backend is connected.",
    });
    navigate({ to: "/instructor/questions" });
  }

  return (
    <InstructorShell
      title={isNew ? "New question" : "Edit question"}
      description="Author the prompt, answers and marking rules for this item."
      actions={
        <>
          <Button asChild variant="ghost">
            <Link to="/instructor/questions">Cancel</Link>
          </Button>
          <Button onClick={save}>
            <Save className="h-4 w-4" />
            Save question
          </Button>
        </>
      }
    >
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4">
        <Link to="/instructor/questions">
          <ArrowLeft className="h-4 w-4" />
          Back to question bank
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Question</CardTitle>
              <CardDescription>Keep prompts unambiguous and self-contained.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  rows={4}
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Type the question students will see…"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="explanation">Explanation (shown after grading)</Label>
                <Textarea
                  id="explanation"
                  rows={3}
                  value={explanation}
                  onChange={(event) => setExplanation(event.target.value)}
                  placeholder="Why is the correct answer correct?"
                />
              </div>
            </CardContent>
          </Card>

          {showOptions && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Answer options</CardTitle>
                <CardDescription>Select the correct option on the left.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {options.map((option) => {
                  const isCorrect = option.id === correctOptionId;
                  return (
                    <div key={option.id} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setCorrectOptionId(option.id)}
                        aria-label={`Mark option ${option.id.toUpperCase()} correct`}
                        aria-pressed={isCorrect}
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-lg border text-sm font-semibold transition-colors",
                          isCorrect
                            ? "border-success/40 bg-success/10 text-success"
                            : "border-border text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {isCorrect ? <Check className="h-4 w-4" /> : option.id.toUpperCase()}
                      </button>
                      <Input
                        value={option.label}
                        onChange={(event) => updateOption(option.id, event.target.value)}
                        placeholder={`Option ${option.id.toUpperCase()}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove option ${option.id.toUpperCase()}`}
                        onClick={() => removeOption(option.id)}
                        disabled={options.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
                <Button variant="outline" size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4" />
                  Add option
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="h-fit shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Metadata</CardTitle>
            <CardDescription>How this item is classified and scored.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Question type</Label>
              <Select value={type} onValueChange={(value) => setType(value as typeof type)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Multiple choice">Multiple choice</SelectItem>
                  <SelectItem value="True / False">True / False</SelectItem>
                  <SelectItem value="Short answer">Short answer</SelectItem>
                  <SelectItem value="Essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionSubjects.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="e.g. Complexity"
              />
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(value) => setDifficulty(value as typeof difficulty)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks">Marks</Label>
              <Input
                id="marks"
                type="number"
                min={1}
                value={marks}
                onChange={(event) => setMarks(Number(event.target.value))}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="min-w-0 pr-3">
                <p className="text-sm font-medium">Publish</p>
                <p className="text-xs text-muted-foreground">Make available to exam builder.</p>
              </div>
              <Switch checked={published} onCheckedChange={setPublished} aria-label="Publish question" />
            </div>
          </CardContent>
        </Card>
      </div>
    </InstructorShell>
  );
}
