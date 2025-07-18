import axios, {AxiosError} from 'axios';

export const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        if (err.response && err.response.data) {
            if (typeof err.response.data === 'string') {
                return err.response.data;
            }
            if (err.response.data.error) {
                return err.response.data.error;
            }
            if (err.response.data.message) {
                return err.response.data.message;
            }
        }
        if (err.message === 'Network Error') {
            return 'Não foi possível conectar ao servidor. Verifique sua conexão ou o status do servidor.';
        }
        return err.message || 'Erro de servidor desconhecido.';
    }
    return 'Ocorreu um erro inesperado.';
};