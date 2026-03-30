"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navLinks, memberLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

const HOME_SECTIONS = [
  { href: "#section-how",     label: "How it works" },
  { href: "#section-results", label: "Results" },
  { href: "#section-offer",   label: "Price" },
  { href: "#section-faq",     label: "FAQ" },
];

const SECTION_IDS = ["section-fit", "section-what", "section-results", "section-how", "section-team", "section-offer", "section-faq", "apply"];

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    let active = true;
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!active) return;
        const data = (await response.json()) as { authenticated?: boolean; user?: AuthUser };
        setUser(data.authenticated ? (data.user ?? null) : null);
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoadingAuth(false);
      }
    };
    void loadUser();
    return () => { active = false; };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function isSectionActive(href: string) {
    const id = href.replace("#", "");
    if (id === "section-how") return activeSection === "section-how";
    if (id === "section-results") return activeSection === "section-results";
    if (id === "section-offer") return activeSection === "section-offer";
    if (id === "section-faq") return activeSection === "section-faq" || activeSection === "apply";
    return false;
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

  return (
    <header className={cn(
      "sticky top-0 z-30 bg-(--color-bg)/90 backdrop-blur transition-[border-color,box-shadow] duration-300",
      scrolled ? "border-b border-(--color-border) shadow-sm" : "border-b border-transparent",
    )}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo — smaller on mobile to leave breathing room */}
        {isHome ? (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl font-black tracking-tight text-foreground transition-colors duration-200 hover:text-(--color-brand) sm:text-2xl"
          >
            Fit Parent Plan
          </button>
        ) : (
          <Link href="/" className="font-display text-xl font-black tracking-tight text-foreground transition-colors duration-200 hover:text-(--color-brand) sm:text-2xl">
            Fit Parent Plan
          </Link>
        )}

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 lg:flex">
          {isHome ? (
            <>
              {HOME_SECTIONS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium transition-colors duration-150",
                    isSectionActive(item.href)
                      ? "text-foreground"
                      : "text-(--color-muted) hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1 text-sm font-medium text-(--color-muted) transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              {/* Homepage: only show Apply CTA — no Login clutter */}
              {loadingAuth ? null : user ? (
                <Button href="/dashboard" variant="ghost">Dashboard</Button>
              ) : (
                <a href="#apply" className="cta-button px-4 py-2 text-xs font-semibold xl:text-sm">
                  Apply · $199/mo
                </a>
              )}
            </>
          ) : (
            <>
              {(user ? memberLinks : navLinks).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand) xl:text-sm",
                    isActive(item.href)
                      ? "bg-(--color-cream) text-foreground"
                      : "text-(--color-muted) hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {loadingAuth ? null : user ? (
                <>
                  <Button href="/dashboard" variant="ghost">Dashboard</Button>
                  <Button type="button" variant="secondary" onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? "Logging out..." : "Log out"}
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/login" variant="ghost">Login</Button>
                  <Link href="/#apply" className="cta-button px-4 py-2 text-xs font-semibold xl:text-sm">
                    See if it fits you
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
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

      {/* Mobile nav drawer */}
      <nav
        className={cn(
          "grid overflow-hidden border-t border-(--color-border) transition-all lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 overflow-y-auto px-4 py-4 sm:px-6">
          {isHome ? (
            <>
              {HOME_SECTIONS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-(--color-muted) hover:bg-(--color-cream) hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-(--color-muted) hover:bg-(--color-cream) hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              {loadingAuth ? null : user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-(--color-cream)"
                >
                  Go to dashboard
                </Link>
              ) : (
                <a
                  href="#apply"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-(--color-cream)"
                >
                  Apply · $199/mo
                </a>
              )}
            </>
          ) : (
            <>
              {(user ? memberLinks : navLinks).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-3 text-sm font-medium hover:bg-(--color-cream)",
                    isActive(item.href) ? "bg-(--color-cream) text-foreground" : "text-(--color-muted)",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </>
          )}
          <div className="mt-2 flex gap-3">
            {loadingAuth ? null : user ? (
              <>
                <Button href="/dashboard" variant="secondary" className="flex-1">Dashboard</Button>
                <Button type="button" className="flex-1" onClick={handleLogout} disabled={isLoggingOut}>
                  {isLoggingOut ? "Logging..." : "Log out"}
                </Button>
              </>
            ) : (
              <>
                <Button href="/login" variant="secondary" className="flex-1">Login</Button>
                <Link href="/#apply" className="cta-button flex flex-1 items-center justify-center px-4 py-3 text-sm font-semibold">
                  Apply · $199/mo
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
