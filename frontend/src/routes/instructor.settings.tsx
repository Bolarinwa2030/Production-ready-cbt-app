import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/instructor/settings")({
  head: () => ({
    meta: [
      { title: "Instructor Settings — Kaptio CBT" },
      {
        name: "description",
        content:
          "Control appearance, grading defaults, exam publishing rules and notification preferences for your instructor account.",
      },
      { property: "og:title", content: "Instructor Settings — Kaptio CBT" },
      {
        property: "og:description",
        content: "Appearance, grading defaults and notification preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InstructorSettingsPage,
});

function ToggleRow({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(Boolean(defaultChecked));
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} aria-label={title} />
    </div>
  );
}

function InstructorSettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <InstructorShell
      title="Settings"
      description="Defaults applied to the exams and reports you create."
      actions={
        <Button onClick={() => toast.success("Settings saved")}>
          <Save className="h-4 w-4" />
          Save
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
            <CardDescription>Choose how Kaptio looks on this device.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={(value) => setTheme(value as typeof theme)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Exam defaults</CardTitle>
            <CardDescription>Pre-filled whenever you build a new exam.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="default-duration">Duration (minutes)</Label>
              <Input id="default-duration" type="number" defaultValue={60} min={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-pass">Pass mark (%)</Label>
              <Input id="default-pass" type="number" defaultValue={50} min={0} max={100} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="default-attempts">Attempts allowed</Label>
              <Input id="default-attempts" type="number" defaultValue={1} min={1} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Grading & publishing</CardTitle>
            <CardDescription>How results reach your students.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <ToggleRow
              title="Auto-grade objective questions"
              description="Score multiple choice and true/false instantly."
              defaultChecked
            />
            <ToggleRow
              title="Release results automatically"
              description="Publish scores as soon as grading completes."
            />
            <ToggleRow
              title="Show explanations to students"
              description="Reveal rationale on the result page."
              defaultChecked
            />
            <ToggleRow
              title="Require moderation before release"
              description="A second instructor must approve results."
            />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
            <CardDescription>What we email or push to you.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <ToggleRow
              title="New submissions"
              description="Notify me when a student submits a script."
              defaultChecked
            />
            <ToggleRow
              title="Grading reminders"
              description="Nudge me about scripts awaiting manual review."
              defaultChecked
            />
            <ToggleRow
              title="Integrity flags"
              description="Alert me about timing anomalies or tab switches."
              defaultChecked
            />
            <ToggleRow title="Weekly digest" description="A summary of cohort performance." />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <Card className="border-destructive/30 shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Danger zone</CardTitle>
          <CardDescription>Archiving hides exams from students but keeps records.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="border-destructive/40 text-destructive">
            Archive all closed exams
          </Button>
        </CardContent>
      </Card>
    </InstructorShell>
  );
}
