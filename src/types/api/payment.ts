import api from './index';
import {
  CheckoutSessionResponse,
  SubscriptionStatusResponse,
} from '../types/api'; 

export const paymentsApi = {
  createCheckoutSession: async (priceId: string, successPath?: string): Promise<CheckoutSessionResponse> => {
    const response = await api.post<CheckoutSessionResponse>('/api/stripe/create-checkout-session', {
      priceId,
      successPath,
    });
    return response.data;
  },

  checkSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await api.get<SubscriptionStatusResponse>('/api/assinatura/status');
    return response.data;
  },

  openStripeCustomerPortal: async (): Promise<CustomerPortalResponse> => {
    const response = await api.post<CustomerPortalResponse>('/api/stripe/customer-portal');
    return response.data;
  },
};