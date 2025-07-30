
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RH7a1RvHw6hJ7PcAFNzVWuLmxlzQX2ZvwzRnYDLSNPnRkvZKGXBaONcXRq48H1f0NylzHvSadcbuoGfnXVnBx7c00zg87FD6e');

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

export const STRIPE_PRODUCTS = {
  ESCOLA_BASICA: {
    productId: 'prod_SRYprhWJIABi0a',
    priceId: 'prod_SRYprhWJIABi0a', 
  },
  ESCOLA_PREMIUM: {
    productId: 'prod_SRYrdnCahxGch3',
    priceId: 'prod_SRYrdnCahxGch3', 
  },
};
