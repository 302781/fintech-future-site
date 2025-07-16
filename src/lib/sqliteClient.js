export const createClient = (url) => { // Removi apiKey, não é usada aqui
    const BASE_URL = url; 

    const auth = {
        async signInWithPassword({ email, password }) {
            try {
                const response = await fetch(`${BASE_URL}/signin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Erro ao fazer login.');
                }
                
                // Armazena o usuário (simula a sessão)
                // Para um sistema real, você armazenaria um JWT aqui
                localStorage.setItem('current_user_session', JSON.stringify(data.user));
                
                // Retorna no formato esperado pelo AuthContext: { data: { user }, error }
                return { data: { user: data.user }, error: null };
            } catch (error) {
                console.error("Erro em signInWithPassword:", error);
                return { data: { user: null }, error: { message: error.message || 'Erro de rede ou servidor.' } };
            }
        },

        async signOut() {
            try {
                // Em um sistema real, você enviaria uma requisição ao backend para invalidar a sessão/token
                // Por agora, apenas remove a sessão local.
                localStorage.removeItem('current_user_session');
                return { error: null };
            } catch (error) {
                console.error("Erro em signOut:", error);
                return { error: { message: error.message || 'Erro ao fazer logout.' } };
            }
        },

        async getUser() {
            try {
                // Obtém o usuário da sessão local
                const userString = localStorage.getItem('current_user_session');
                const user = userString ? JSON.parse(userString) : null;

                // Opcional: Se quiser que o backend revalide o usuário a cada carregamento:
                if (user && user.id) {
                   const response = await fetch(`${BASE_URL}/user`, {
                       headers: { 'Authorization': `Bearer ${user.id}` } // Envia o ID como "token" para o backend
                   });
                   const data = await response.json();
                   if (response.ok && data.data?.user) {
                       return { data: { user: data.data.user }, error: null };
                   } else {
                       localStorage.removeItem('current_user_session'); // Limpa se inválido
                       return { data: { user: null }, error: null };
                   }
                }
                
                return { data: { user: user }, error: null }; // Retorna o user do localStorage se não validar no backend
            } catch (error) {
                console.error("Erro em getUser:", error);
                return { data: { user: null }, error: { message: error.message || 'Erro ao obter usuário.' } };
            }
        },

        // onAuthStateChange é complexo de simular perfeitamente no frontend sem WebSockets.
        // Esta é uma simulação muito básica que só dispara o callback uma vez na inicialização.
        onAuthStateChange(callback) {
            const userString = localStorage.getItem('current_user_session');
            const user = userString ? JSON.parse(userString) : null;
            const session = user ? { user: user } : null; // Simula uma sessão Supabase

            // Dispara o callback imediatamente com o estado atual
            if (user) {
                callback('SIGNED_IN', session);
            } else {
                callback('SIGNED_OUT', null);
            }
            
            // Retorna um objeto que simula a "assinatura" do Supabase
            const subscription = {
                unsubscribe: () => { /* Nenhuma ação real aqui para a simulação */ }
            };
            return { data: { subscription } };
        }
    };

    return { auth }; // Retorna um objeto com a propriedade 'auth'
};