"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navLinks, platformLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!active) return;

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = (await response.json()) as { authenticated?: boolean; user?: AuthUser };
        setUser(data.authenticated ? (data.user ?? null) : null);
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoadingAuth(false);
      }
    };

    void loadUser();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setPlatformOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const isHome = pathname === "/";

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  function handlePlatformKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setPlatformOpen(false);
    }
  }

  function handlePlatformMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setPlatformOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-(--color-border) bg-(--color-bg)/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-2xl text-foreground">
          Fit Parent Plan
        </Link>
        <nav className="hidden items-center gap-3 lg:flex">
          {isHome ? (
            <>
              <a
                href="#offer"
                className="rounded-full px-3 py-1 text-xs font-semibold text-(--color-muted) transition-colors hover:text-foreground xl:text-sm"
              >
                Program
              </a>
              <a
                href="#outcomes"
                className="rounded-full px-3 py-1 text-xs font-semibold text-(--color-muted) transition-colors hover:text-foreground xl:text-sm"
              >
                Results
              </a>
              <a
                href="#faq"
                className="rounded-full px-3 py-1 text-xs font-semibold text-(--color-muted) transition-colors hover:text-foreground xl:text-sm"
              >
                FAQ
              </a>
              {loadingAuth ? null : user ? (
                <Button href="/dashboard" variant="ghost">Dashboard</Button>
              ) : (
                <a
                  href="#apply"
                  className="rounded-full bg-(--color-brand) px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-(--color-brand-strong) hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  See if it fits you
                </a>
              )}
            </>
          ) : (
            <>
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] xl:text-sm",
                    isActive(item.href)
                      ? "bg-(--color-cream) text-foreground"
                      : "text-(--color-secondary) hover:text-(--color-brand)",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="group relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={platformOpen}
                  aria-controls="platform-menu"
                  onClick={() => setPlatformOpen((prev) => !prev)}
                  onKeyDown={handlePlatformKeyDown}
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] xl:text-sm",
                    platformLinks.some((item) => isActive(item.href))
                      ? "bg-(--color-cream) text-foreground"
                      : "text-(--color-secondary) hover:text-(--color-brand)",
                  )}
                >
                  Tools
                </button>
                <div
                  id="platform-menu"
                  role="menu"
                  onKeyDown={handlePlatformMenuKeyDown}
                  className={cn(
                    "pointer-events-none absolute left-0 top-full z-20 mt-2 w-64 rounded-[20px] border border-(--color-border) bg-(--color-bg-soft) p-2 opacity-0 shadow-lg transition-all duration-150",
                    platformOpen && "pointer-events-auto opacity-100",
                    "group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100",
                  )}
                >
                  {platformLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      role="menuitem"
                      className={cn(
                        "block rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-(--color-cream) hover:text-foreground",
                        isActive(item.href)
                          ? "bg-(--color-cream) text-foreground"
                          : "text-(--color-secondary)",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              {loadingAuth ? null : user ? (
                <>
                  <Button href="/dashboard" variant="ghost">
                    Dashboard
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? "Logging out..." : "Log out"}
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/login" variant="ghost">
                    Login
                  </Button>
                  <a
                    href="/#apply"
                    className="rounded-full bg-(--color-brand) px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-(--color-brand-strong) hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand) focus-visible:ring-offset-2 focus-visible:ring-offset-background xl:text-sm"
                  >
                    See if it fits you
                  </a>
                </>
              )}
            </>
          )}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md border border-(--color-border) p-2 text-foreground lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
      <nav
        className={cn(
          "grid overflow-hidden border-t border-(--color-border) transition-all lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 overflow-y-auto px-4 py-4 sm:px-6">
          {isHome ? (
            <>
              <a
                href="#offer"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-(--color-muted) hover:bg-(--color-cream) hover:text-foreground"
              >
                Program
              </a>
              <a
                href="#outcomes"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-(--color-muted) hover:bg-(--color-cream) hover:text-foreground"
              >
                Results
              </a>
              <a
                href="#faq"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-(--color-muted) hover:bg-(--color-cream) hover:text-foreground"
              >
                FAQ
              </a>
              {loadingAuth ? null : user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-(--color-cream)"
                >
                  Go to dashboard
                </Link>
              ) : (
                <a
                  href="#apply"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-(--color-cream)"
                >
                  See if it fits you
                </a>
              )}
            </>
          ) : (
            <>
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium hover:bg-(--color-cream)",
                    isActive(item.href)
                      ? "bg-(--color-cream) text-foreground"
                      : "text-(--color-secondary)",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 rounded-xl border border-(--color-border) p-2">
                <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-(--color-muted)">
                  Platform
                </p>
                {platformLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm font-medium hover:bg-(--color-cream)",
                      isActive(item.href)
                        ? "bg-(--color-cream) text-foreground"
                        : "text-(--color-secondary)",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
          <div className="mt-2 flex gap-3">
            {loadingAuth ? null : user ? (
              <>
                <Button href="/dashboard" variant="secondary" className="flex-1">
                  Dashboard
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging..." : "Log out"}
                </Button>
              </>
            ) : (
              <>
                <Button href="/login" variant="secondary" className="flex-1">
                  Login
                </Button>
                <a
                  href="/#apply"
                  className="flex flex-1 items-center justify-center rounded-full bg-(--color-brand) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-brand-strong)"
                >
                  See if it fits you
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
