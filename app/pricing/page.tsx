import { redirect } from "next/navigation";

// Pricing lives on the home page now. Keep the route to preserve any
// inbound links / SEO equity, but send visitors to the section.
export default function PricingPage(): never {
  redirect("/#section-offer");
}
