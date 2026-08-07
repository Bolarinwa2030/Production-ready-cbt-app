import { createFileRoute } from "@tanstack/react-router";
import { Mail, Pencil } from "lucide-react";
import { toast } from "sonner";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { bankQuestions, instructor, managedExams, submissions } from "@/data/instructor";

export const Route = createFileRoute("/instructor/profile")({
  head: () => ({
    meta: [
      { title: "Instructor Profile — Kaptio CBT" },
      {
        name: "description",
        content:
          "Your teaching profile: department, staff ID, contact details and a summary of exams and questions you own.",
      },
      { property: "og:title", content: "Instructor Profile — Kaptio CBT" },
      {
        property: "og:description",
        content: "Manage your instructor details and see your authoring activity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InstructorProfilePage,
});

function InstructorProfilePage() {
  return (
    <InstructorShell
      title="Profile"
      description="Your account details as they appear to students and faculty."
      actions={
        <Button onClick={() => toast.success("Profile updated")}>
          <Pencil className="h-4 w-4" />
          Save changes
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <Card className="h-fit shadow-soft">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                {instructor.avatarInitials}
              </AvatarFallback>
            </Avatar>
            <p className="mt-4 font-display text-lg font-bold">{instructor.name}</p>
            <p className="text-sm text-muted-foreground">{instructor.title}</p>
            <Badge variant="outline" className="mt-3">
              {instructor.department}
            </Badge>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {instructor.email}
            </p>

            <dl className="mt-6 grid w-full grid-cols-3 gap-2">
              {[
                { label: "Exams", value: managedExams.length },
                { label: "Questions", value: bankQuestions.length },
                { label: "Scripts", value: submissions.length },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border p-3">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="font-display text-lg font-bold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Personal information</CardTitle>
              <CardDescription>Kept in sync with the faculty directory.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" defaultValue={instructor.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={instructor.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff-id">Staff ID</Label>
                <Input id="staff-id" defaultValue={instructor.staffId} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue={instructor.department} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Short bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  defaultValue="Teaches algorithms, operating systems and cloud architecture. Research interest in assessment integrity."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Exams you own</CardTitle>
              <CardDescription>Assessments created under your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {managedExams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{exam.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {exam.cohort} · {exam.questions} questions · {exam.durationMinutes} min
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {exam.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </InstructorShell>
  );
}
