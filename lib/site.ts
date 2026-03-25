export const siteConfig = {
  name: "Fit Parent Plan",
  description:
    "20-minute home workouts and family-friendly meal plans for busy parents.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.svg",
  contactEmail: "support@fitparentplan.com",
};

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export const memberLinks = [
  { href: "/workouts", label: "Workouts" },
  { href: "/meal-plans", label: "Meal Plans" },
  { href: "/planner", label: "Planner" },
  { href: "/protocols", label: "Protocols" },
  { href: "/tools", label: "Tools" },
];
