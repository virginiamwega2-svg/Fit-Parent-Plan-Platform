import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return typeof (props as ButtonAsLink).href === "string";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "cta-button",
  secondary: "cta-button-secondary",
  ghost: "cta-button-ghost",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
  const passthrough = { ...props } as Record<string, unknown>;
  delete passthrough.variant;
  delete passthrough.size;
  delete passthrough.className;
  delete passthrough.children;

  if (isLinkProps(props)) {
    delete passthrough.href;
    return (
      <Link
        href={props.href}
        className={classes}
        {...(passthrough as Omit<ButtonAsLink, keyof BaseProps | "href">)}
      >
        {children}
      </Link>
    );
  }

  delete passthrough.href;
  return (
    <button className={classes} {...(passthrough as Omit<ButtonAsButton, keyof BaseProps>)}>
      {children}
    </button>
  );
}
