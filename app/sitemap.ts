import type { MetadataRoute } from "next";
import { workouts } from "@/lib/data/workouts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Public-facing pages only — exclude auth, dashboard, and member-only routes
const PUBLIC_ROUTES: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "",                 priority: 1.0,  freq: "weekly"  },
  { path: "/about",           priority: 0.85, freq: "monthly" },
  { path: "/contact",         priority: 0.75, freq: "monthly" },
  { path: "/sample-workout",  priority: 0.90, freq: "monthly" },
  { path: "/privacy",         priority: 0.30, freq: "yearly"  },
  { path: "/terms",           priority: 0.30, freq: "yearly"  },
];

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = PUBLIC_ROUTES.map(({ path, priority, freq }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }));

  const workoutPages = workouts.map((workout) => ({
    url: `${siteUrl}/workouts/${workout.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...workoutPages];
}
