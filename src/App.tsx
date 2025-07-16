import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Importe Navigate
import { AuthProvider, useAuth } from "@/contexts/AuthContext"; // Importe useAuth

// Importe suas páginas
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import PorqueNos from "./pages/PorqueNos";
import Equipe from "./pages/Equipe";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import Simuladores from "./pages/Simuladores";
import FAQ from "./pages/FAQ";
import FormularioPagamento from "./pages/ContratarPlanoForm"; // Renomeado para consistência
import ConsultoresFinanceiros from "./pages/ConsultoresFinanceiros";
import PlanosCorporativos from "./pages/PlanosCorporativos";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import CursosBasico from "./pages/CursosBasico";
import BibliotecaCompleta from './pages/BibliotecaCompleta'; 
import SettingsPage from "./pages/SettingsPage";

// --- Importação do novo componente unificado ---
import EducacaoECorporativo from './pages/EducacaoECorporativo'; 

// --- Declaração do QueryClient (NECESSÁRIO) ---
const queryClient = new QueryClient();

// --- Componente de Rota Protegida (Melhorado para usar useAuth) ---
// Removido o import duplicado e a re-declaração. Use este.
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth(); // Assume que useAuth retorna 'user' e 'loading'

  if (loading) {
    // Opcional: Mostre um spinner ou loading screen enquanto verifica o status do usuário
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user) {
    // Redireciona para a página de login se não houver usuário logado
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner /> {/* Este é o Toaster da biblioteca Sonner */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/porque-nos" element={<PorqueNos />} />
            <Route path="/simuladores" element={<Simuladores />} />
            <Route path="/planos-corporativos" element={<PlanosCorporativos />} />
            
            {/* --- Nova rota unificada --- */}
            <Route path="/educacao-e-corporativo" element={<EducacaoECorporativo />} />
            {/* Rota para o formulário de contratação (agora com nome consistente) */}
            <Route path="/contratar-plano" element={<FormularioPagamento />} /> {/* Uso de FormularioPagamento como o ContratarPlanoForm */}

            <Route path="/equipe" element={<Equipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pagamento" element={<FormularioPagamento />} /> {/* A rota /pagamento ainda existe, apontando para o mesmo formulário */}
            <Route path="/consultores" element={<ConsultoresFinanceiros />} />
            <Route path="/biblioteca-completa" element={<BibliotecaCompleta />} />
            
            {/* Rotas protegidas */}
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cursos-basico" 
              element={
                <ProtectedRoute>
                  <CursosBasico />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cursos" 
              element={
                <ProtectedRoute>
                  <Cursos />
                </ProtectedRoute>
              } 
            />
            {/* Adicione outras rotas protegidas aqui */}

            {/* Rota para 404 - sempre a última */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;