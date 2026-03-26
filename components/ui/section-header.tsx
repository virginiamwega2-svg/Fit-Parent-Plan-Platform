import type React from "react";
import { Badge } from "@/components/ui/badge";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  titleLight?: string;
  titleBold?: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  titleLight,
  titleBold,
  description,
  align = "left",
}: SectionHeaderProps) {
  const hasEditorial = titleLight !== undefined && titleBold !== undefined;

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="mt-3 text-balance text-3xl tracking-tight sm:text-4xl">
        {hasEditorial ? (
          <>
            <span className="font-light italic text-(--color-muted)">{titleLight} </span>
            <span className="font-black text-foreground">{titleBold}</span>
          </>
        ) : (
          <span className="font-semibold text-foreground">{title}</span>
        )}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty text-base leading-7 text-(--color-muted)">
          {description}
        </p>
      ) : null}
    </div>
  );
}
