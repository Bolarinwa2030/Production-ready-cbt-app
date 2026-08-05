import { createFileRoute } from "@tanstack/react-router";
import { Camera, Mail, Save, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recentResults, student } from "@/data/student";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile — Kaptio CBT" },
      { name: "description", content: "Manage your student profile, programme details and identity verification status." },
      { property: "og:title", content: "Student Profile — Kaptio CBT" },
      { property: "og:description", content: "Your student identity, programme and exam summary." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell title="Profile" description="Your identity as it appears on exam records and certificates.">
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="h-fit shadow-soft">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {student.avatarInitials}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full"
                aria-label="Change profile photo"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="mt-4 font-display text-lg font-bold">{student.name}</h2>
            <p className="text-sm text-muted-foreground">{student.program}</p>
            <Badge variant="outline" className="mt-3 gap-1.5 border-success/40 text-success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Identity verified
            </Badge>

            <dl className="mt-6 w-full space-y-3 border-t border-border pt-6 text-left text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Student ID</dt>
                <dd className="truncate font-medium">{student.studentId}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Cohort</dt>
                <dd className="font-medium">{student.cohort}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Attempts</dt>
                <dd className="font-medium">{recentResults.length}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Personal details</CardTitle>
              <CardDescription>Changes are reviewed by your examinations officer.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-5 sm:grid-cols-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  toast.success("Profile changes submitted for review");
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" defaultValue={student.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileEmail">Email</Label>
                  <Input id="profileEmail" type="email" defaultValue={student.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+234 800 000 0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tz">Time zone</Label>
                  <Input id="tz" defaultValue={student.timezone} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">About</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    placeholder="A short note visible to your instructors."
                    defaultValue="Final-year computer science student focused on distributed systems and databases."
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit">
                    <Save className="h-4 w-4" />
                    Save changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Examination contact</CardTitle>
              <CardDescription>Where sitting confirmations and results are sent.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span className="min-w-0 truncate">{student.email}</span>
              <Badge variant="secondary" className="ml-auto">
                Primary
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
