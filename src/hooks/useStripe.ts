
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useStripe = () => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (priceId: string, successPath?: string) => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Você precisa estar logado para fazer uma assinatura.');
        setLoading(false);
        return;
      }

      console.log('Calling create-checkout-session with priceId:', priceId, 'and successPath:', successPath);
      
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId, successPath },
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        let errorMessage = 'Erro ao processar pagamento. Tente novamente.';
        // The error object from Supabase functions is a FunctionsHttpError
        if (error.context && typeof error.context.json === 'function') {
          try {
            const functionError = await error.context.json();
            if (functionError.error) {
              errorMessage = functionError.error;
            }
          } catch(e) {
            console.error("Could not parse error from function", e);
          }
        }
        throw new Error(errorMessage);
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return { subscribed: false };
      }

      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        return { subscribed: false };
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      return { subscribed: false };
    }
  };

  const openCustomerPortal = async () => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Você precisa estar logado para gerenciar sua assinatura.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) {
        console.error('Error opening customer portal:', error);
        throw new Error(error.message);
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao abrir portal de gerenciamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    redirectToCheckout,
    checkSubscription,
    openCustomerPortal,
    loading,
  };
};
