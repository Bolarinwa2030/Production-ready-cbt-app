import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
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
import { systemSettings } from "@/data/admin";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "System Settings — Kaptio CBT Admin" },
      {
        name: "description",
        content:
          "Configure platform identity, security policy, exam defaults, data residency and maintenance windows.",
      },
      { property: "og:title", content: "System Settings — Kaptio CBT Admin" },
      {
        property: "og:description",
        content: "Platform identity, security policy and maintenance configuration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SystemSettingsPage,
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
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={setChecked} aria-label={title} />
    </div>
  );
}

function SystemSettingsPage() {
  return (
    <AdminShell
      title="System settings"
      description="Global configuration applied to every institution."
      actions={
        <Button>
          <Save className="h-4 w-4" />
          Save changes
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Platform identity</CardTitle>
            <CardDescription>Branding and contact details shown to users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform name</Label>
              <Input id="platform-name" defaultValue={systemSettings.platformName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email">Support email</Label>
              <Input id="support-email" type="email" defaultValue={systemSettings.supportEmail} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Default timezone</Label>
              <Select defaultValue={systemSettings.defaultTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                  <SelectItem value="Africa/Accra">Africa/Accra (GMT)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Security policy</CardTitle>
            <CardDescription>Authentication and session rules.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <ToggleRow
              title="Require MFA for staff"
              description="Instructors and administrators must enrol a second factor."
              defaultChecked
            />
            <ToggleRow
              title="Single sign-on (SAML)"
              description="Allow institutions to federate identity with their IdP."
              defaultChecked
            />
            <ToggleRow
              title="Block sign-in from new regions"
              description="Challenge logins originating from unrecognised countries."
            />
            <div className="space-y-2 pt-4">
              <Label htmlFor="session-timeout">Session timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                defaultValue={systemSettings.sessionTimeoutMinutes}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Exam defaults</CardTitle>
            <CardDescription>Applied to newly created exams platform-wide.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <ToggleRow
              title="Auto-submit on timer end"
              description="Submit an attempt automatically when the countdown reaches zero."
              defaultChecked
            />
            <ToggleRow
              title="Shuffle question order"
              description="Randomise question sequence for each candidate."
              defaultChecked
            />
            <ToggleRow
              title="Full-screen lockdown"
              description="Warn candidates when they leave the exam window."
            />
            <div className="space-y-2 pt-4">
              <Label htmlFor="upload-limit">Max upload size (MB)</Label>
              <Input id="upload-limit" type="number" defaultValue={systemSettings.maxUploadMb} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Data & maintenance</CardTitle>
            <CardDescription>Residency, backups and scheduled downtime.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="region">Primary data region</Label>
              <Select defaultValue={systemSettings.dataRegion}>
                <SelectTrigger id="region">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eu-west-1">eu-west-1 (Ireland)</SelectItem>
                  <SelectItem value="af-south-1">af-south-1 (Cape Town)</SelectItem>
                  <SelectItem value="us-east-1">us-east-1 (Virginia)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance">Maintenance window</Label>
              <Input id="maintenance" defaultValue={systemSettings.maintenanceWindow} />
            </div>
            <Separator />
            <ToggleRow
              title="Nightly encrypted backups"
              description="Retain point-in-time snapshots for 35 days."
              defaultChecked
            />
            <ToggleRow
              title="Maintenance mode"
              description="Show a holding page and block all non-admin traffic."
            />
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
