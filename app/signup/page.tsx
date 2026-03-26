import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
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
      <div className="mx-auto max-w-md pt-6 text-center">
        <h1 className="text-3xl tracking-tight">
          <span className="font-light italic text-(--color-muted)">Create your </span>
          <span className="font-black text-foreground">account.</span>
        </h1>
      </div>
      <div className="mx-auto mt-6 max-w-md">
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
