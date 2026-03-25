import type { MetadataRoute } from "next";
import { workouts } from "@/lib/data/workouts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/workouts",
    "/meal-plans",
    "/planner",
    "/protocols",
    "/case-studies",
    "/community",
    "/tools",
    "/accountability",
    "/methodology",
    "/pricing",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/forgot-password",
    "/dashboard",
    "/privacy",
    "/terms",
  ];
  const lastModified = new Date();

  const staticPages = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const workoutPages = workouts.map((workout) => ({
    url: `${siteUrl}/workouts/${workout.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...workoutPages];
}
