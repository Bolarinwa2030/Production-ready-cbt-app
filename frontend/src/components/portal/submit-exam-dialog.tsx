import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function SubmitExamDialog({
  answered,
  total,
  flagged,
  onConfirm,
  trigger,
}: {
  answered: number;
  total: number;
  flagged: number;
  onConfirm: () => void;
  trigger: ReactNode;
}) {
  const unanswered = total - answered;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Submit your exam?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Once submitted you cannot return to this attempt. Please confirm your summary below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <dl className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-muted/40 p-4 text-center">
          <div>
            <dt className="text-xs text-muted-foreground">Answered</dt>
            <dd className="font-display text-xl font-bold text-success">{answered}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Unanswered</dt>
            <dd className="font-display text-xl font-bold text-destructive">{unanswered}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Flagged</dt>
            <dd className="font-display text-xl font-bold text-warning">{flagged}</dd>
          </div>
        </dl>

        <AlertDialogFooter>
          <AlertDialogCancel>Keep working</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Submit exam</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
