"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  className?: string;
  label?: string;
  priceLabel?: string;
};

export function SubscribeButton({
  className,
  label = "Start membership",
  priceLabel = "$10/mo",
}: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const data = (await res.json()) as { url?: string; message?: string };
      if (!res.ok || !data.url) {
        setError(data.message ?? "Couldn't open checkout — try again?");
        setPending(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Lost the connection — try once more?");
      setPending(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className={className}
      >
        {pending ? (
          "Opening checkout…"
        ) : (
          <>
            {label} — {priceLabel}
            <ArrowRight size={14} aria-hidden="true" />
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-center text-xs text-(--color-muted)">{error}</p>
      )}
    </div>
  );
}
