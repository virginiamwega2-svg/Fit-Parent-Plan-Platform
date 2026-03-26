import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { buildMetadata } from "@/lib/metadata";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = buildMetadata("Login", "Access your Fit Parent Plan dashboard.", "/login");

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="pb-12">
      <div className="mx-auto max-w-md pt-6 text-center">
        <h1 className="text-3xl tracking-tight">
          <span className="font-light italic text-(--color-muted)">Welcome </span>
          <span className="font-black text-foreground">back.</span>
        </h1>
      </div>
      <div className="mx-auto mt-6 max-w-md">
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-(--color-muted)">
          Forgot your password?{" "}
          <Link href="/forgot-password" className="font-semibold text-(--color-brand-strong) underline">
            Reset it
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-(--color-muted)">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-(--color-brand-strong) underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
