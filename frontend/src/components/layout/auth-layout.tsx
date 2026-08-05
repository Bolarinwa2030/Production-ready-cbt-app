import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShieldCheck, Clock, BarChart3 } from "lucide-react";

const highlights = [
  { icon: ShieldCheck, text: "Secure, proctor-ready exam delivery" },
  { icon: Clock, text: "Autosave keeps every answer safe" },
  { icon: BarChart3, text: "Instant analytics after submission" },
];

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-hero-gradient p-12 lg:flex lg:flex-col lg:justify-between">
        <Link to="/" aria-label="Kaptio CBT home">
          <Logo labelClassName="text-primary-foreground" />
        </Link>
        <div className="max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight text-primary-foreground">
            The exam room, reimagined for the browser.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
            Over 480 institutions run high-stakes assessments on Kaptio — with zero-loss autosave,
            adaptive question banks and instant result publishing.
          </p>
          <ul className="mt-10 space-y-4">
            {highlights.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-foreground/15">
                  <item.icon className="h-4 w-4 text-primary-foreground" />
                </span>
                <span className="text-sm text-primary-foreground/90">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/70">
          Trusted for 2.4M+ proctored sittings worldwide.
        </p>
      </aside>

      <main className="flex flex-col bg-background">
        <div className="flex items-center justify-between p-5 lg:justify-end">
          <Link to="/" className="lg:hidden" aria-label="Kaptio CBT home">
            <Logo />
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-16">
          <div className="w-full max-w-md">
            <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
