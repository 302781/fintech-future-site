
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

// IDs dos produtos e preços configurados no Stripe
export const STRIPE_PRODUCTS = {
  ESCOLA_BASICA: {
    productId: 'prod_SRYprhWJIABi0a',
    priceId: 'price_1RWfhmRvHw6hJ7Pc5SKfc6Oo', // R$ 299/mês
  },
  ESCOLA_PREMIUM: {
    productId: 'prod_SRYrdnCahxGch3',
    priceId: 'price_1RWfjgRvHw6hJ7PcLaTee9gT', // R$ 599/mês
  },
};
