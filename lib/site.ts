export const siteConfig = {
  name: "Fit Parent Plan",
  description:
    "20-minute home workouts and family-friendly meal plans for busy parents.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.svg",
  contactEmail: "support@fitparentplan.com",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/planner", label: "Planner" },
  { href: "/workouts", label: "Workouts" },
  { href: "/meal-plans", label: "Meal Plans" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const platformLinks = [
  { href: "/protocols", label: "Busy Week Protocols" },
  { href: "/case-studies", label: "Parent Case Studies" },
  { href: "/community", label: "Community Cohorts" },
  { href: "/tools", label: "Parent Tools" },
  { href: "/accountability", label: "Accountability Lab" },
  { href: "/methodology", label: "Methodology" },
];
