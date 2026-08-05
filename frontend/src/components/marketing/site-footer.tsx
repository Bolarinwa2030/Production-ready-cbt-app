import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Platform",
    links: ["Exam authoring", "Proctoring", "Question banks", "Analytics"],
  },
  {
    title: "Solutions",
    links: ["Universities", "Certification bodies", "Enterprise L&D", "Bootcamps"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Accessibility", "Status", "Support centre"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Secure computer-based testing for universities, certification providers and
              enterprise learning teams — from question bank to verified certificate.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <span className="cursor-default text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kaptio CBT. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5 text-xs text-muted-foreground">
            <Link to="/login" className="transition-colors hover:text-foreground">
              Student sign in
            </Link>
            <span className="cursor-default">Privacy</span>
            <span className="cursor-default">Terms</span>
            <span className="cursor-default">WCAG 2.1 AA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
