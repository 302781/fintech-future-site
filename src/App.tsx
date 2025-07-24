import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'; // Adicionado useParams e Navigate
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./contexts/AuthContextHook"; // Importe useAuth do seu hook

import { investmentPlatformsData, InvestmentIconMap } from './data/investmentPlatformsData';
import { courseContentData, CourseIconMap } from './data/courseContentData';

import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import PorqueNos from "./pages/PorqueNos";
import EducacaoECorporativo from './pages/EducacaoECorporativo';
import AssinaturasCorporativas from "./pages/AssinaturasCorporativas";
import Equipe from "./pages/Equipe";
import PlanosCorporativosForm from './pages/PlanosCorporativosForm'; // Importação existente
import Login from "./pages/Login";
import ContactPage from './pages/ContactPage';
import CheckoutForm from "./pages/ContratarPlanoForm"; // Este é o componente que você importou para formulário de pagamento
import PlanosPage from './pages/PlanosPage';

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
import AdminDashboard from './components/AdminDashboard';
import VideoPlayer from "./components/VideoPlayer";
import GamePlayer from "./components/GamePlayer/GamePlayer";
import SecuritySettingPage from "./components/SecuritySettingPage";
import PrivateRoute from './components/PrivateRoute'; 

const VideoPlayerWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <VideoPlayer src={id ?? ""} />;
}

const queryClient = new QueryClient();

const PrivateRouteComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // Se o usuário não estiver logado, redirecione para a página de login
  if (!user) {
    return <Navigate to="/login" replace />; // Usando o componente Navigate importado
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

        <Route path="/planos-corporativos" element={<PlanosCorporativosForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/porque-nos" element={<PorqueNos />} />
        <Route path="/contato" element={<ContactPage />} />
        {/* Usando CheckoutForm conforme o import */}
        <Route path="/contratar-plano" element={<CheckoutForm />} />

        <Route path="/educacao-e-corporativo" element={<EducacaoECorporativo />} />
        <Route path="/equipe" element={<Equipe />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/faq" element={<FAQ />} />
        {/* Usando CheckoutForm conforme o import */}
        <Route path="/pagamento" element={<CheckoutForm />} />
        <Route
          path="video/:id"
          element={
            <VideoPlayerWrapper /> // Usando o wrapper para pegar o ID da URL
          }
        />
        <Route path="/biblioteca-completa" element={<BibliotecaCompleta />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/aulas" element={<Aulas />} />
        <Route path="/escola-premium" element={<EscolaPremium />} />
        <Route path="/escola-basica" element={<EscolaBasica />} />
        <Route path="/simuladores" element={<Simuladores />} />
        <Route path="jogo/:id" element={<GamePlayer />} />
        {/* Usando PrivateRouteComponent definido abaixo */}
        <Route path="/dashboard" element={<PrivateRouteComponent><AdminDashboard /></PrivateRouteComponent>} />
        <Route path="/assinaturas-corporativa" element={<AssinaturasCorporativas />} />
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
            <PrivateRouteComponent> {/* Usando PrivateRouteComponent */}
              <SettingsPage />
            </PrivateRouteComponent>
          }
        />
        <Route
          path="/cursos-basico"
          element={
            <PrivateRouteComponent> {/* Usando PrivateRouteComponent */}
              <Cursos />
            </PrivateRouteComponent>
          }
        />
        <Route
          path="/cursos"
          element={
            <PrivateRouteComponent> {/* Usando PrivateRouteComponent */}
              <Cursos />
            </PrivateRouteComponent>
          }
        />
        <Route
          path="/seguranca" // <-- Certifique-se que o path é "/seguranca" (tudo minúsculo)
          element={
            <PrivateRouteComponent>
              <SecuritySettingPage />
            </PrivateRouteComponent>
          }
        />

        {/* Rota para 404 - sempre a última */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;