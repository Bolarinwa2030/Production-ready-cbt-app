import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Plus, Share2 } from "lucide-react";
import { toast } from "sonner";
import { InstructorShell } from "@/components/layout/instructor-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { reports, reportTemplates } from "@/data/instructor";

export const Route = createFileRoute("/instructor/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Kaptio CBT Instructor" },
      {
        name: "description",
        content:
          "Generate and download result sheets, item analyses, participation summaries and integrity logs for your exams.",
      },
      { property: "og:title", content: "Reports — Kaptio CBT Instructor" },
      {
        property: "og:description",
        content: "Downloadable result sheets, item analysis and participation reports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <InstructorShell
      title="Reports"
      description="Generate exportable summaries for faculty, moderation and archiving."
      actions={
        <Button onClick={() => toast.success("Report queued for generation")}>
          <Plus className="h-4 w-4" />
          New report
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportTemplates.map((template) => (
          <Card key={template.id} className="shadow-soft">
            <CardContent className="p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <FileText className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-semibold">{template.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() => toast.success(`${template.name} report generating…`)}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Generated reports</CardTitle>
          <CardDescription>Available for the last 90 days.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{report.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {report.description}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">{report.format}</Badge>
                  <span>{report.scope}</span>
                  <span>·</span>
                  <span>{report.size}</span>
                  <span>·</span>
                  <span>
                    {new Date(report.generatedAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" aria-label="Share report">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Download report">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </InstructorShell>
  );
}
