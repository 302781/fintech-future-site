// src/hooks/useStripe.ts
import { useState } from 'react';
import { toast } from 'sonner';
// Apenas importa as APIs que agora usam fetch internamente
import { paymentsApi } from '../api/payment';

import {
  SubscriptionStatusResponse,
  BackendErrorResponse
} from '../types/api'; // <--- CORRIGIDO AQUI!


export const useStripe = () => { // Ou useStripeFetch
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
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        message = (error as { message: string }).message;
      } else if (typeof error === 'string') {
        message = error;
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
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        message = (error as { message: string }).message;
      } else if (typeof error === 'string') {
        message = error;
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