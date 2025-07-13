import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Começa como true para indicar que estamos verificando a sessão

    // Função auxiliar para obter a mensagem de erro (conforme sugerido acima)
    const getErrorMessage = (err: any): string => {
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
            if (err.message === 'Network Error') { // Erro de rede explícito
                return 'Não foi possível conectar ao servidor. Verifique sua conexão ou o status do servidor.';
            }
            return err.message || 'Erro de servidor desconhecido.';
        }
        return 'Ocorreu um erro inesperado.';
    };

    // Função para lidar com o login (com as correções)
    const signIn = async (email: string, password: string) => { // Removidos firstName, lastName
        setLoading(true);
        try {
            // Supondo que o backend retorne o token e os dados do usuário
            const res = await axios.post('http://localhost:3001/signin', { email, password });
            
            // Supondo que o token esteja em res.data.token
            const token = res.data.token; 
            localStorage.setItem('authToken', token); // Armazena o token
            
            // Supondo que os dados do usuário estejam em res.data.user
            setUser(res.data.user); 
            
            // Configura o cabeçalho Authorization para futuras requisições com Axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setLoading(false);
            return { error: null };
        } catch (err: any) {
            setLoading(false);
            const message = getErrorMessage(err);
            return { error: { message } };
        }
    };

    // Função para lidar com o cadastro
    const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3001/signup', { email, password, firstName, lastName });
            // Após o cadastro, você pode querer logar o usuário automaticamente
            // Ou apenas indicar sucesso e redirecionar para a tela de login.
            // Se o backend retorna um token, pode fazer o mesmo que signIn aqui.
            setLoading(false);
            return { error: null, success: true, message: "Cadastro realizado com sucesso! Agora você pode fazer login." };
        } catch (err: any) {
            setLoading(false);
            const message = getErrorMessage(err);
            return { error: { message } };
        }
    };

    // Função para lidar com o logout
    const signOut = () => {
        setUser(null);
        localStorage.removeItem('authToken'); // Remove o token do localStorage
        delete axios.defaults.headers.common['Authorization']; // Limpa o cabeçalho de autenticação do Axios
    };

    // Efeito para verificar a autenticação ao carregar a aplicação
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                // Tenta validar o token com o backend (opcional, mas recomendado para segurança)
                try {
                    // Endpoint no backend para validar o token e retornar dados do usuário
                    const res = await axios.get('http://localhost:3001/validate-token', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(res.data.user);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } catch (error) {
                    console.error('Erro ao validar token:', error);
                    localStorage.removeItem('authToken'); // Token inválido, remove-o
                }
            }
            setLoading(false); // Marca o carregamento como concluído
        };
        checkAuth();
    }, []); // O array vazio garante que este efeito roda apenas uma vez, no montagem do componente

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};