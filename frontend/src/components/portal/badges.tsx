import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/data/student";

const tone: Record<Difficulty, string> = {
  Beginner: "border-success/40 bg-success/10 text-success",
  Intermediate: "border-info/40 bg-info/10 text-info",
  Advanced: "border-destructive/40 bg-destructive/10 text-destructive",
};

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn(tone[difficulty], className)}>
      {difficulty}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: "Passed" | "Failed" }) {
  return (
    <Badge
      variant="outline"
      className={
        status === "Passed"
          ? "border-success/40 bg-success/10 text-success"
          : "border-destructive/40 bg-destructive/10 text-destructive"
      }
    >
      {status}
    </Badge>
  );
}
