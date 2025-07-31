import api from 'src/types/api'; 
import {
  SubscriptionStatusResponse, 
} from '../types/api'; 

interface ChangeSubscriptionPlanRequest {
  newPlanId: string;
}

interface ChangeSubscriptionPlanResponse {
  success: boolean;
  message: string;
  newStatus?: string; 
}

interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
}


export const subscriptionsApi = {
  getSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await api.get<SubscriptionStatusResponse>('/api/assinatura/status-detalhado');
    return response.data;
  },

  changePlan: async (data: ChangeSubscriptionPlanRequest): Promise<ChangeSubscriptionPlanResponse> => {
    const response = await api.post<ChangeSubscriptionPlanResponse>('/api/assinatura/alterar-plano', data);
    return response.data;
  },

  cancelSubscription: async (): Promise<CancelSubscriptionResponse> => {
    const response = await api.post<CancelSubscriptionResponse>('/api/assinatura/cancelar');
    return response.data;
  },

  reactivateSubscription: async (): Promise<SubscriptionStatusResponse> => {
    const response = await api.post<SubscriptionStatusResponse>('/api/assinatura/reativar');
    return response.data;
  },
};