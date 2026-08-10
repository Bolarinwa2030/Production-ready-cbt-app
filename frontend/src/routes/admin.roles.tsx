import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, ShieldCheck } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { permissionLabels, roles, type PermissionKey } from "@/data/admin";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [
      { title: "Role Management — Kaptio CBT Admin" },
      {
        name: "description",
        content:
          "Define roles and fine-grained permissions for students, instructors, institution admins and super admins.",
      },
      { property: "og:title", content: "Role Management — Kaptio CBT Admin" },
      {
        property: "og:description",
        content: "Fine-grained permissions for every role on the platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoleManagementPage,
});

const permissionKeys = Object.keys(permissionLabels) as PermissionKey[];

function RoleManagementPage() {
  const [selectedId, setSelectedId] = useState(roles[2]!.id);
  const [granted, setGranted] = useState<Record<string, PermissionKey[]>>(() =>
    Object.fromEntries(roles.map((r) => [r.id, [...r.permissions]])),
  );

  const selected = roles.find((r) => r.id === selectedId)!;
  const selectedPermissions = granted[selectedId] ?? [];

  const toggle = (key: PermissionKey) => {
    setGranted((prev) => {
      const current = prev[selectedId] ?? [];
      return {
        ...prev,
        [selectedId]: current.includes(key)
          ? current.filter((k) => k !== key)
          : [...current, key],
      };
    });
  };

  return (
    <AdminShell
      title="Role management"
      description="Control what each role can do across the platform."
      actions={
        <Button>
          <Plus className="h-4 w-4" />
          New role
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Roles</CardTitle>
            <CardDescription>{roles.length} roles defined.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {roles.map((role) => {
              const active = role.id === selectedId;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedId(role.id)}
                  aria-pressed={active}
                  className={`w-full rounded-xl border p-4 text-left transition-colors ${
                    active
                      ? "border-primary bg-accent/60"
                      : "border-border hover:bg-accent/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{role.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{role.description}</p>
                    </div>
                    {role.system && (
                      <Badge variant="outline" className="shrink-0">
                        System
                      </Badge>
                    )}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {role.members.toLocaleString()} members ·{" "}
                    {(granted[role.id] ?? []).length} permissions
                  </p>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {selected.name} permissions
                </CardTitle>
                <CardDescription>{selected.description}</CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {selectedPermissions.length}/{permissionKeys.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {permissionKeys.map((key) => {
                const id = `${selectedId}-${key}`;
                return (
                  <label
                    key={key}
                    htmlFor={id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-accent/40"
                  >
                    <Checkbox
                      id={id}
                      checked={selectedPermissions.includes(key)}
                      onCheckedChange={() => toggle(key)}
                      className="mt-0.5"
                    />
                    <span className="min-w-0">
                      <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
                        {permissionLabels[key]}
                      </Label>
                      <span className="mt-1 block font-mono text-xs text-muted-foreground">
                        {key}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button>Save changes</Button>
              <Button
                variant="outline"
                onClick={() =>
                  setGranted((prev) => ({ ...prev, [selectedId]: [...selected.permissions] }))
                }
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
