import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Save, Sun } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/lib/theme";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Kaptio CBT" },
      { name: "description", content: "Control appearance, accessibility, exam preferences, notifications and account security." },
      { property: "og:title", content: "Settings — Kaptio CBT" },
      { property: "og:description", content: "Appearance, accessibility, notifications and security preferences." },
    ],
  }),
  component: SettingsPage,
});

const notificationPrefs = [
  { id: "exam-reminders", label: "Exam reminders", hint: "24 hours and 1 hour before a sitting.", defaultChecked: true },
  { id: "result-alerts", label: "Result published", hint: "Email me when a result goes live.", defaultChecked: true },
  { id: "practice-digest", label: "Weekly practice digest", hint: "Suggested practice sets each Monday.", defaultChecked: false },
  { id: "leaderboard", label: "Leaderboard movement", hint: "Notify me when my cohort rank changes.", defaultChecked: false },
];

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell title="Settings" description="Personalise your portal, exam experience and alerts.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
            <CardDescription>Choose how Kaptio looks on this device.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "light" as const, label: "Light", icon: Sun },
                { value: "dark" as const, label: "Dark", icon: Moon },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTheme(option.value)}
                  aria-pressed={theme === option.value}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-sm font-medium transition-colors",
                    theme === option.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary/40"
                      : "border-border hover:bg-accent/40",
                  )}
                >
                  <option.icon className="h-4 w-4" />
                  {option.label}
                </button>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="density">Interface density</Label>
              <Select defaultValue="comfortable">
                <SelectTrigger id="density">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Exam experience</CardTitle>
            <CardDescription>Applies to every sitting on this account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { id: "fullscreen", label: "Enter full screen automatically", hint: "Reduces accidental tab switching." },
              { id: "confirm-next", label: "Confirm before leaving a question", hint: "Warn me if I move on unanswered." },
              { id: "large-text", label: "Large question text", hint: "Increases exam typography size." },
            ].map((item) => (
              <div key={item.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <Label htmlFor={item.id}>{item.label}</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.hint}</p>
                </div>
                <Switch id={item.id} defaultChecked={item.id !== "large-text"} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Notifications</CardTitle>
            <CardDescription>Choose what lands in your inbox.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {notificationPrefs.map((pref) => (
              <div key={pref.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <Label htmlFor={pref.id}>{pref.label}</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">{pref.hint}</p>
                </div>
                <Switch id={pref.id} defaultChecked={pref.defaultChecked} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Security</CardTitle>
            <CardDescription>Keep your exam account protected.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                <Label htmlFor="mfa">Two-factor authentication</Label>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Required for certification exams.
                </p>
              </div>
              <Switch id="mfa" defaultChecked />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
              <Monitor className="h-4 w-4 shrink-0" />
              Signed in on 2 devices · Chrome on macOS, Safari on iPad
            </div>
            <Button onClick={() => toast.success("Settings saved")}>
              <Save className="h-4 w-4" />
              Save settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
