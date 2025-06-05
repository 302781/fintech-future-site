
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RH7a1RvHw6hJ7PcQsG6HwirhndTkQGExYls8AN1tYbrdOODKLOpCanIte0NFMeUASFSykkkJu1otCI3ADzK0ZV600PMcMcMKm');

export { stripePromise };

export const createCheckoutSession = async (priceId: string, customerEmail?: string) => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      customerEmail,
      mode: 'subscription',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
};
