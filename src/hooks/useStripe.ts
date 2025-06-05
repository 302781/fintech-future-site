
import { useState } from 'react';
import { stripePromise, createCheckoutSession } from '@/lib/stripe';
import { toast } from 'sonner';

export const useStripe = () => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (priceId: string, customerEmail?: string) => {
    try {
      setLoading(true);
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const session = await createCheckoutSession(priceId, customerEmail);
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    redirectToCheckout,
    loading,
  };
};
