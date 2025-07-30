
import { useState } from 'react';
import { toast } from 'sonner';
import { paymentsApi } from '..
/api/payments';
import axios, { AxiosError, isAxiosError } from 'axios'; 
import { SubscriptionStatusResponse } from '@/types/api/subscriptions';

export const useStripe = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const redirectToCheckout = async (priceId: string, successPath?: string): Promise<void> => {
    try {
      setLoading(true);

      const jwtToken = localStorage.getItem('jwt_token');
      if (!jwtToken) {
        toast.error('Você precisa estar logado para fazer uma assinatura.');
        setLoading(false);
        return;
      }

      console.log('Calling create-checkout-session with priceId:', priceId, 'and successPath:', successPath);

      const data = await paymentsApi.createCheckoutSession(priceId, successPath);

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('URL de checkout não recebida do backend.');
      }
    } catch (error) {
      console.error('Erro na redireção do checkout:', error);
      let message = 'Erro desconhecido ao processar pagamento. Tente novamente.';

      if (error instanceof Error) {
        message = error.message;
      } else if (isAxiosError(error) && error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        // Usa isAxiosError importado
        message = (error.response.data as { message: string }).message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const checkSubscription = async (): Promise<SubscriptionStatusResponse | { subscribed: false }> => {
    try {
      if (!localStorage.getItem('jwt_token')) {
        return { subscribed: false };
      }
      return await paymentsApi.checkSubscriptionStatus();
    } catch (error) {
      console.error('Erro na verificação da assinatura:', error);
      return { subscribed: false };
    }
  };

  const openCustomerPortal = async (): Promise<void> => {
    try {
      setLoading(true);

      const jwtToken = localStorage.getItem('jwt_token');
      if (!jwtToken) {
        toast.error('Você precisa estar logado para gerenciar sua assinatura.');
        setLoading(false);
        return;
      }

      const data = await paymentsApi.openStripeCustomerPortal();

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('URL do portal do cliente não recebida do backend.');
      }
    } catch (error) {
      console.error('Erro ao abrir portal do cliente:', error);
      let message = 'Erro desconhecido ao abrir portal de gerenciamento. Tente novamente.';
      if (error instanceof Error) {
        message = error.message;
      } else if (isAxiosError(error) && error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        // Usa isAxiosError importado
        message = (error.response.data as { message: string }).message;
      }
      toast.error(message);
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