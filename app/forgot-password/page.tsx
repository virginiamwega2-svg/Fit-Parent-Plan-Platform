import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { SectionHeader } from "@/components/ui/section-header";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Forgot Password",
  "Reset your Fit Parent Plan account password.",
  "/forgot-password",
);

export default function ForgotPasswordPage() {
  return (
    <div className="pb-6">
      <SectionHeader
        eyebrow="Reset password"
        title="Get back to your plan"
        description="Enter your email and we’ll send reset instructions."
        align="center"
      />
      <div className="mt-8">
        <AuthForm mode="forgot" />
      </div>
    </div>
  );
}
