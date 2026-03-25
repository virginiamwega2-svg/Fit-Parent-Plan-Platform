import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/metadata";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = buildMetadata("Sign Up", "Create your Fit Parent Plan account.", "/signup");

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="pb-12">
      <SectionHeader
        eyebrow="Create account"
        title="Create your account"
        description="Set up your account to access your dashboard, workouts, and meal plans."
        align="center"
      />
      <div className="mx-auto mt-8 max-w-md">
        <AuthForm mode="signup" />
        <p className="mt-4 text-center text-sm text-(--color-muted)">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-(--color-brand-strong) underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
