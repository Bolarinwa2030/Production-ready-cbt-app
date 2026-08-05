import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Fingerprint,
  Globe2,
  LayoutGrid,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import heroImage from "@/assets/hero-exam.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaptio CBT — Secure Computer-Based Testing Platform" },
      {
        name: "description",
        content:
          "Run high-stakes online exams with autosave, proctoring-ready delivery, adaptive question banks and instant analytics. Built for universities and certification bodies.",
      },
      { property: "og:title", content: "Kaptio CBT — Secure Computer-Based Testing Platform" },
      {
        property: "og:description",
        content:
          "High-stakes online exam delivery with autosave, proctoring and instant analytics.",
      },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: ShieldCheck,
    title: "Exam integrity by default",
    body: "Lockdown mode, randomised question pools, IP allow-lists and full audit trails on every sitting.",
  },
  {
    icon: Clock,
    title: "Zero-loss autosave",
    body: "Every answer is persisted the moment it is selected, so a dropped connection never costs a grade.",
  },
  {
    icon: LayoutGrid,
    title: "Composable question banks",
    body: "Multiple choice, multi-select, numeric and scenario items organised by topic, difficulty and outcome.",
  },
  {
    icon: BarChart3,
    title: "Analytics that teach",
    body: "Item difficulty, discrimination indices and per-topic mastery published the second an exam closes.",
  },
  {
    icon: Globe2,
    title: "Global scale delivery",
    body: "Edge-served sittings across regions with time-zone aware scheduling and localisation.",
  },
  {
    icon: Fingerprint,
    title: "Accessible & compliant",
    body: "WCAG 2.1 AA interface, screen-reader tested, keyboard-first navigation and extra-time accommodations.",
  },
];

const stats = [
  { value: "480+", label: "Institutions" },
  { value: "2.4M", label: "Exams delivered" },
  { value: "99.99%", label: "Sitting uptime" },
  { value: "<40ms", label: "Answer autosave" },
];

const testimonials = [
  {
    quote:
      "We migrated 14,000 end-of-semester sittings to Kaptio in one term. Zero lost submissions and results published the same afternoon.",
    name: "Dr. Helena Marsh",
    role: "Director of Assessment, Northfield University",
  },
  {
    quote:
      "The item analytics changed how we write questions. We retired 30% of our bank in the first cycle because the data was finally legible.",
    name: "Tomas Ilves",
    role: "Head of Certification, CloudGuild",
  },
  {
    quote:
      "Candidates consistently rate the exam interface higher than our previous vendor. It simply gets out of the way.",
    name: "Ada Nwosu",
    role: "L&D Lead, Meridian Group",
  },
];

const audiences = [
  {
    icon: Users,
    title: "Universities",
    body: "Semester scheduling, cohort management and registrar-grade reporting.",
  },
  {
    icon: ShieldCheck,
    title: "Certification bodies",
    body: "Single-attempt integrity, verified certificates and psychometric exports.",
  },
  {
    icon: Sparkles,
    title: "Enterprise L&D",
    body: "Compliance testing, role-based tracks and renewal reminders at scale.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-surface-glow">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
            <div>
              <Badge variant="outline" className="gap-2 border-primary/30 bg-primary/10 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Now with adaptive practice sets
              </Badge>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                High-stakes exams, delivered without a single dropped answer.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Kaptio CBT is the computer-based testing platform for universities, certification
                providers and enterprise learning teams — secure delivery, live invigilation and
                instant, defensible results.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/register">
                    Create student account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/dashboard">Explore the student portal</Link>
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {["No plugins required", "WCAG 2.1 AA", "SOC 2 aligned"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
                <img
                  src={heroImage}
                  alt="Kaptio exam interface showing a question card, question palette and performance charts"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="border-y border-border bg-card">
            <dl className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-primary">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="secondary">Platform</Badge>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything an assessment team needs, in one place
            </h2>
            <p className="mt-4 text-muted-foreground">
              From authoring to invigilation to appeals, Kaptio replaces the spreadsheet-and-email
              workflow with a single auditable system.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="card-hover h-full shadow-soft">
                <CardContent className="p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for every kind of examiner
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {audiences.map((audience) => (
                <div
                  key={audience.title}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <audience.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {audience.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Assessment leaders on Kaptio
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="h-full shadow-soft">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="h-6 w-6 text-primary" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="security" className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl bg-hero-gradient px-6 py-16 text-center shadow-elevated sm:px-12">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Give every candidate a calm, fair, fully auditable exam.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Start with the student portal today — instructor and administrator workspaces roll out
              on the same design system.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link to="/register">Create your account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
