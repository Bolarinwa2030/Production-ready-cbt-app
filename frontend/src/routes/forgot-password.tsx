import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MailCheck, Send } from "lucide-react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Kaptio CBT" },
      { name: "description", content: "Request a secure password reset link for your Kaptio CBT student account." },
      { property: "og:title", content: "Reset your password — Kaptio CBT" },
      { property: "og:description", content: "Request a secure password reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your institutional email and we'll send a secure reset link."
      footer={
        <Link to="/login" className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <Alert className="border-success/40 bg-success/10">
          <MailCheck className="h-4 w-4 text-success" />
          <AlertTitle>Check your inbox</AlertTitle>
          <AlertDescription>
            If an account exists for that address, a reset link valid for 30 minutes is on its way.
          </AlertDescription>
        </Alert>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Institutional email</Label>
            <Input id="email" type="email" autoComplete="email" placeholder="you@university.edu" required />
          </div>
          <Button type="submit" size="lg" className="w-full">
            <Send className="h-4 w-4" />
            Send reset link
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Still locked out? Contact your examinations officer to verify your identity.
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
