import { BackendErrorResponse } from '../types/api'; 

export const API_BASE_BASE_URL = import.meta.env.VITE_NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const getAuthHeaders = (): HeadersInit => {
  const jwtToken = localStorage.getItem('jwt_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`;
  }
  return headers;
};

export const handleFetchError = async (response: Response): Promise<Error> => {
  let errorMessage = `Erro do servidor: ${response.status} ${response.statusText}`;
  try {
    const errorData: BackendErrorResponse = await response.json();
    if (errorData && errorData.message) {
      errorMessage = errorData.message;
    }
  } catch (parseError) {
    console.error('Falha ao parsear erro do servidor como JSON:', parseError);
  }
  return new Error(errorMessage);
};