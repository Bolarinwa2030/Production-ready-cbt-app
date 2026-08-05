import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your student account — Kaptio CBT" },
      { name: "description", content: "Register for the Kaptio CBT student portal to sit exams, practise and track your results." },
      { property: "og:title", content: "Create your student account — Kaptio CBT" },
      { property: "og:description", content: "Register for secure online exams and instant results." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register with your institutional details to start taking exams."
      footer={
        <>
          Already registered?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in instead
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: "/dashboard" });
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" autoComplete="given-name" placeholder="Amara" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" autoComplete="family-name" placeholder="Okonkwo" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Institutional email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@university.edu" required />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" placeholder="CSC/2023/10428" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program">Programme</Label>
            <Select>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select programme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">BSc Computer Science</SelectItem>
                <SelectItem value="is">BSc Information Systems</SelectItem>
                <SelectItem value="eng">BEng Software Engineering</SelectItem>
                <SelectItem value="cert">Professional Certification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" placeholder="••••••••" required />
          <p className="text-xs text-muted-foreground">
            Minimum 10 characters with a number and a symbol.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" type="password" autoComplete="new-password" placeholder="••••••••" required />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="terms" className="mt-0.5" required />
          <Label htmlFor="terms" className="text-sm font-normal leading-relaxed text-muted-foreground">
            I agree to the examination rules, academic integrity policy and privacy notice.
          </Label>
        </div>

        <Button type="submit" size="lg" className="w-full">
          <UserPlus className="h-4 w-4" />
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
