import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Eye } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/portal/badges";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentResults } from "@/data/student";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Exam History — Kaptio CBT" },
      { name: "description", content: "Every exam attempt you have made, with score, duration, pass status and links to full results." },
      { property: "og:title", content: "Exam History — Kaptio CBT" },
      { property: "og:description", content: "All past attempts with scores and result links." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <AppShell
      title="Exam history"
      description="A complete record of your attempts and outcomes."
      actions={
        <Button variant="outline">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      }
    >
      <Card className="overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="min-w-40">Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.examTitle}</TableCell>
                  <TableCell className="text-muted-foreground">{result.subject}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(result.date).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{result.durationUsed}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={result.scorePercent} className="h-1.5 w-24" />
                      <span className="text-sm font-semibold">{result.scorePercent}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={result.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/results/$examId" params={{ examId: result.examId }}>
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AppShell>
  );
}
