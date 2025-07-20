import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth } from "./contexts/AuthContext";
import { investmentPlatformsData, InvestmentIconMap } from './data/investmentPlatformsData';
import { courseContentData, CourseIconMap } from './data/courseContentData';

// Importe suas páginas
import Index from "./pages/Index";
import AssinaturasCorporativas from "./pages/AssinaturasCorporativas";
import Aulas from "./pages/Aulas";
import ContratarPlanoForm from "./pages/ContratarPlanoForm";
import CourseContent from "./pages/CourseContent";
import EscolaPremium from "./pages/EscolaPremium";
import EscolaBasica from "./pages/EscolaBasica";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import PorqueNos from "./pages/PorqueNos";
import RedeEnsino from "./pages/RedeEnsino";
import Equipe from "./pages/Equipe";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import Simuladores from "./pages/Simuladores";
import FAQ from "./pages/FAQ";
import InvestmentPlatforms from "./pages/InvestmentPlatforms";
import FormularioPagamento from "./pages/ContratarPlanoForm";
import ConsultoresFinanceiros from "./pages/ConsultoresFinanceiros";
import PlanosCorporativos from "./pages/PlanosCorporativos";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import BibliotecaCompleta from './pages/BibliotecaCompleta';
import SettingsPage from "./pages/SettingsPage";

// --- Importação do novo componente unificado ---
import EducacaoECorporativo from './pages/EducacaoECorporativo';

// --- Declaração do QueryClient (NECESSÁRIO) ---
const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/porque-nos" element={<PorqueNos />} />
          <Route path="/planos-corporativos" element={<PlanosCorporativos />} />

          <Route path="/educacao-e-corporativo" element={<EducacaoECorporativo />} />
          <Route path="/contratar-plano" element={<FormularioPagamento />} />

          <Route path="/equipe" element={<Equipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pagamento" element={<FormularioPagamento />} />
          <Route path="/consultores" element={<ConsultoresFinanceiros />} />
          <Route path="/biblioteca-completa" element={<BibliotecaCompleta />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/escola-premium" element={<EscolaPremium />} />
          <Route path="/escola-basica" element={<EscolaBasica/>} />
           <Route path="/simuladores" element={<Simuladores/>} />

          <Route path="/investment-plataforms" 
            element={<InvestmentPlatforms platforms={investmentPlatformsData} IconMap={InvestmentIconMap} />} 
          />
          <Route 
            path="/course-content" 
            element={<CourseContent courses={courseContentData} IconMap={CourseIconMap} />} 
          />

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
                <Cursos />
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
         
          {/* Rota para 404 - sempre a última */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </TooltipProvider>
  </QueryClientProvider>
);

export default App;