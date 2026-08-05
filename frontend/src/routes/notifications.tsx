import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications as seedNotifications } from "@/data/student";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Kaptio CBT" },
      { name: "description", content: "Exam reminders, published results and system updates for your student account." },
      { property: "og:title", content: "Notifications — Kaptio CBT" },
      { property: "og:description", content: "Exam reminders, results and platform updates." },
    ],
  }),
  component: NotificationsPage,
});

const filters = ["All", "Exam", "Result", "System", "Reminder"] as const;

function NotificationsPage() {
  const [items, setItems] = useState(seedNotifications);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = items.filter((item) => filter === "All" || item.category === filter);
  const unread = items.filter((item) => item.unread).length;

  return (
    <AppShell
      title="Notifications"
      description={`${unread} unread update${unread === 1 ? "" : "s"}.`}
      actions={
        <Button
          variant="outline"
          onClick={() => setItems((current) => current.map((item) => ({ ...item, unread: false })))}
        >
          <CheckCheck className="h-4 w-4" />
          Mark all read
        </Button>
      }
    >
      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)} className="mb-4">
        <TabsList className="flex-wrap">
          {filters.map((item) => (
            <TabsTrigger key={item} value={item}>
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="shadow-soft">
        <CardContent className="divide-y divide-border p-0">
          {visible.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-medium">Nothing here yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Notifications in this category will appear here.
              </p>
            </div>
          ) : (
            visible.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setItems((current) =>
                    current.map((n) => (n.id === item.id ? { ...n, unread: false } : n)),
                  )
                }
                className={cn(
                  "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 p-5 text-left transition-colors hover:bg-accent/40",
                  item.unread && "bg-primary/5",
                )}
              >
                <span
                  className={cn(
                    "mt-2 h-2 w-2 shrink-0 rounded-full",
                    item.unread ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
                <div className="min-w-0">
                  <p className="font-medium leading-snug">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{item.time}</p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {item.category}
                </Badge>
              </button>
            ))
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
