import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-03-25.dahlia",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { message: "Payment service is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { email?: string; name?: string };
    const email = typeof body.email === "string" ? body.email.trim() : undefined;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email ?? undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            unit_amount: 19900, // $199.00
            product_data: {
              name: "Fit Parent Plan — Monthly Coaching",
              description: "20-minute daily workouts built for busy parents. Cancel anytime.",
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          name: body.name ?? "",
        },
      },
      success_url: `${SITE_URL}/thank-you?payment=success`,
      cancel_url: `${SITE_URL}/#apply`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Stripe checkout error", error);
    }
    return NextResponse.json(
      { message: "Could not create checkout session. Please try again." },
      { status: 500 },
    );
  }
}
