import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) {
    return NextResponse.json({ received: true });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json(
      { message: "Webhook signature verification failed." },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (process.env.NODE_ENV !== "production") {
        console.info("New subscriber:", {
          email: session.customer_email,
          subscriptionId: session.subscription,
        });
      }
      // TODO: mark lead as converted in your DB, or trigger onboarding email via Resend.
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      if (process.env.NODE_ENV !== "production") {
        console.info("Subscription cancelled:", subscription.id);
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
