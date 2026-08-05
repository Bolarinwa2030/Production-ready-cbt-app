import { questions } from "@/data/student";
import { useExamSession } from "@/lib/exam-session";
import { cn } from "@/lib/utils";

const legend = [
  { label: "Answered", className: "bg-primary" },
  { label: "Flagged", className: "bg-warning" },
  { label: "Unanswered", className: "bg-muted-foreground/30" },
];

export function QuestionPalette({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (index: number) => void;
}) {
  const { answers, flagged } = useExamSession();
  const answeredCount = questions.filter((q) => answers[q.id]).length;

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const isAnswered = Boolean(answers[question.id]);
          const isFlagged = Boolean(flagged[question.id]);
          const isCurrent = index === current;

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Go to question ${index + 1}${isAnswered ? ", answered" : ""}${isFlagged ? ", flagged" : ""}`}
              aria-current={isCurrent ? "true" : undefined}
              className={cn(
                "relative grid h-10 w-full place-items-center rounded-lg border text-sm font-semibold transition-colors",
                isAnswered
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted/50 text-muted-foreground hover:bg-accent",
                isCurrent && "ring-2 ring-ring ring-offset-2 ring-offset-background",
              )}
            >
              {index + 1}
              {isFlagged && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-warning" />
              )}
            </button>
          );
        })}
      </div>

      <dl className="mt-5 space-y-2 text-xs text-muted-foreground">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={cn("h-2.5 w-2.5 rounded-full", item.className)} />
            <dt>{item.label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-5 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{answeredCount}</span> of {questions.length}{" "}
        answered · <span className="font-semibold text-foreground">{questions.length - answeredCount}</span>{" "}
        remaining
      </p>
    </div>
  );
}
