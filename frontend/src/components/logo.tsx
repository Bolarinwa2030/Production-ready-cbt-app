import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  labelClassName,
  compact = false,
}: {
  className?: string;
  labelClassName?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
        <GraduationCap className="h-5 w-5" />
      </span>
      {!compact && (
        <span className={cn("font-display text-lg font-bold tracking-tight", labelClassName)}>
          Kaptio<span className="text-primary">CBT</span>
        </span>
      )}
    </span>
  );
}
