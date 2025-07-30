// src/api/subscriptions.ts
import api from './index'; // Importa a instância do Axios configurada

// Importe as interfaces de tipagem relevantes do seu arquivo de tipos
import {
  SubscriptionStatusResponse,
  // Adicione outras interfaces se precisar para, por exemplo,
  // ChangePlanRequest, ChangePlanResponse, CancelSubscriptionResponse etc.
} from '.'; // Ajuste o caminho conforme a localização real do seu arquivo types/api.ts

// Seus modelos de dados para requisições e respostas de assinatura
// Exemplo:
interface ChangeSubscriptionPlanRequest {
  newPlanId: string;
  // Qualquer outro dado necessário para mudar o plano (ex: cupom, período)
}

interface ChangeSubscriptionPlanResponse {
  success: boolean;
  message: string;
  newStatus?: string; // Ex: 'active', 'pending_change'
  // Adicione dados do novo plano, se for útil
}

interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
  // Outros dados relevantes após o cancelamento
}


export const subscriptionsApi = {
  /**
   * Obtém o status atual da assinatura do usuário logado.
   * Requer autenticação (token JWT no interceptor do Axios).
   * @returns Promise<SubscriptionStatusResponse>
   */
  getSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    // Este endpoint pode ser o mesmo que paymentsApi.checkSubscriptionStatus
    // Ou pode ser um endpoint mais detalhado para o gerenciamento de assinaturas
    const response = await api.get<SubscriptionStatusResponse>('/api/assinatura/status-detalhado');
    return response.data;
  },

  /**
   * Altera o plano de assinatura do usuário.
   * @param data Objeto contendo o ID do novo plano.
   * @returns Promise<ChangeSubscriptionPlanResponse>
   */
  changePlan: async (data: ChangeSubscriptionPlanRequest): Promise<ChangeSubscriptionPlanResponse> => {
    const response = await api.post<ChangeSubscriptionPlanResponse>('/api/assinatura/alterar-plano', data);
    return response.data;
  },

  /**
   * Cancela a assinatura do usuário.
   * @returns Promise<CancelSubscriptionResponse>
   */
  cancelSubscription: async (): Promise<CancelSubscriptionResponse> => {
    const response = await api.post<CancelSubscriptionResponse>('/api/assinatura/cancelar');
    return response.data;
  },

  /**
   * (Opcional) Reativa uma assinatura previamente cancelada.
   * @returns Promise<SubscriptionStatusResponse>
   */
  reactivateSubscription: async (): Promise<SubscriptionStatusResponse> => {
    const response = await api.post<SubscriptionStatusResponse>('/api/assinatura/reativar');
    return response.data;
  },

  // Adicione outras funções relacionadas a assinaturas aqui, como:
  // - getInvoices()
  // - updatePaymentMethod()
  // - applyCoupon()
};