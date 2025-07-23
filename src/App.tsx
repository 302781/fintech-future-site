import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from './components/ProtectedRoute';
import { useAuth } from "./contexts/AuthContextHook";
import { useNavigate } from './contexts/AuthContextHook';
import { investmentPlatformsData, InvestmentIconMap } from './data/investmentPlatformsData';
import { courseContentData, CourseIconMap } from './data/courseContentData';

import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import PorqueNos from "./pages/PorqueNos";
import EducacaoECorporativo from './pages/EducacaoECorporativo';
import AssinaturasCorporativas from "./pages/AssinaturasCorporativas";
import Equipe from "./pages/Equipe";
import PlanosCorporativos from './pages/PlanosCorporativos';
import Login from "./pages/Login";
import ContactPage from './pages/ContactPage';
import FormularioPagamento from "./pages/ContratarPlanoForm";

import ContratarPlanoForm from "./pages/ContratarPlanoForm";
import CourseContent from "./pages/CourseContent";
import EscolaPremium from "./pages/EscolaPremium";
import EscolaBasica from "./pages/EscolaBasica";
import Servicos from "./pages/Servicos";
import RedeEnsino from "./pages/RedeEnsino";
import Aulas from "./pages/Aulas";
import Cursos from "./pages/Cursos";
import Simuladores from "./pages/Simuladores";
import FAQ from "./pages/FAQ";
import InvestmentPlatforms from "./pages/InvestmentPlatforms";
import ConsultoresFinanceiros from "./pages/ConsultoresFinanceiros";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import BibliotecaCompleta from './pages/BibliotecaCompleta';
import Biblioteca from './pages/Biblioteca';
import SettingsPage from "./pages/SettingsPage";
import AdminDashboard from './pages/AdminDashboard';
import VideoPlayer from "./components/VideoPlayer";
import GamePlayer from "./components/GamePlayer/GamePlayer";
import { useParams } from "react-router-dom";

const VideoPlayerWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // You may want to map id to src, for now assuming src is id
  return <VideoPlayer src={id ?? ""} />;
}

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
        <Routes future={ 
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_relativeSplatPath: true, }>
        
          <Route path="/" element={<Index />} />
          <Route path="/planos-corporativos" element={<PlanosCorporativos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/porque-nos" element={<PorqueNos />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/contratar-plano" element={<FormularioPagamento />} />

          <Route path="/educacao-e-corporativo" element={<EducacaoECorporativo />} />
          <Route path="/equipe" element={<Equipe />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pagamento" element={<FormularioPagamento />} />
          <Route 
            path="video/:id" 
            element={
              <VideoPlayerWrapper />
            } 
          /> 
          <Route path="/biblioteca-completa" element={<BibliotecaCompleta />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/escola-premium" element={<EscolaPremium />} />
          <Route path="/escola-basica" element={<EscolaBasica/>} />
           <Route path="/simuladores" element={<Simuladores/>} />
          <Route path="video/:id" element={<VideoPlayer src={''} />} /> 
          <Route path="jogo/:id" element={<GamePlayer />} /> 
          <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} /> 
        { <Route path="/assinaturas-corporativa" element={<AssinaturasCorporativas />} /> }
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