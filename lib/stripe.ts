// lib/stripe.ts
import Stripe from 'stripe';

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
  });
}

export const getPriceId = () => process.env.STRIPE_PRICE_ID!;
