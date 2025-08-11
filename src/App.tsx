// src/pages/HomePage.tsx (ou Index.tsx)
import React from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom'; // Adicionado useParams e Navigate
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from './contexts/AuthContext'; // <-- CORRIGIDO: Importa useAuth do AuthContext.ts

//Inicio
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import PorqueNos from "./pages/PorqueNos";
import EducacaoECorporativo from './pages/EducacaoECorporativo';
import Equipe from "./pages/Equipe";
import Login from "./components/auth/Login";

// Assinaturas
import AssinaturasCorporativas from "./pages/AssinaturasCorporativas";
import PlanosCorporativosForm from './pages/PlanosCorporativosForm';
import Homepage from './pages/Homepage';
import CheckoutForm from "./components/PaymentForm";
import PlanosPage from './pages/PlanosPage';
import { investmentPlatformsData, InvestmentIconMap } from './data/investmentPlatformsData';
import CheckoutPage from './pages/CheckountPage';
import ReciboPage from './pages/ReciboPage';
import EscolaPremium from "./pages/EscolaPremium";
import EscolaBasica from "./pages/EscolaBasica";
import RedeEnsino from "./pages/RedeEnsino";
import InvestmentPlatforms from "./pages/InvestmentPlatforms";
import ConsultoresFinanceiros from "./pages/ConsultoresFinanceiros";
import SchoolRegistration from './pages/SchoolRegistration';

//Entrar
import AdminDashboard from './components/AdminDashboard';
import ContactPage from './pages/ContactPage';
import Consultores from './components/Consultores';
import FAQ from "./pages/FAQ";

// Cursos
import CourseContent from "./pages/CourseContent";
import { courseContentData, CourseIconMap } from './data/courseContentData';
import Aulas from "./pages/Aulas";
import Cursos from "./pages/Cursos";
import Simuladores from "./pages/Simuladores";
import BibliotecaCompleta from './pages/BibliotecaCompleta';
import Biblioteca from './pages/Biblioteca';
import VideoPlayer from "./components/VideoPlayer";
import GamePlayer from "./components/GamePlayer/GamePlayer";

// Configurações
import NotFound from "./pages/NotFound";
import ForgotPassword from "./components/auth/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import SettingsPage from "./pages/SettingsPage";
import SecuritySettingPage from "./components/SecuritySettingPage";
import PrivateRoute from './components/PrivateRoute'; // Se você ainda usar esse, verifique sua importação interna de useAuth
import AgendamentoPage from './pages/AgendamentoPage';


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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <Routes>
        {/* Rotas do Início */}
        <Route path="/" element={<Index />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/porque-nos" element={<PorqueNos />} />
        <Route path="/educacao-e-corporativo" element={<EducacaoECorporativo />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas de Entrada, Contato e Ajuda */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRouteComponent><AdminDashboard /></PrivateRouteComponent>} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Rotas de Cursos */}
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/aulas" element={<Aulas />} />
        <Route path="/simuladores" element={<Simuladores />} />
        <Route path="/biblioteca-completa" element={<BibliotecaCompleta />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/video-player" element={<VideoPlayerWrapper />} />
        <Route path="/game-player" element={<GamePlayer />} />
        <Route path="/video/:id" element={<VideoPlayerWrapper />} />
        <Route path="/game/:id" element={<GamePlayer />} />
        <Route path="/consultores" element={<Consultores />} />
        <Route path="/agendamento" element={<AgendamentoPage />} />
        <Route path="/investment-plataforms" element={<InvestmentPlatforms platforms={investmentPlatformsData} IconMap={InvestmentIconMap} />} />
        <Route path="/course-content" element={<CourseContent courses={courseContentData} IconMap={CourseIconMap} />} />
        <Route path="/cursos-basico" element={
          <PrivateRouteComponent>
            <Cursos />
          </PrivateRouteComponent>
        }
        />
        <Route
          path="/cursos"
          element={
            <PrivateRouteComponent>
              <Cursos />
            </PrivateRouteComponent>
          }
        />

        {/* Rotas de Configurações */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/settings" element={
          <PrivateRouteComponent>
            <SettingsPage />
          </PrivateRouteComponent>
        }
        />
        <Route
          path="/seguranca"
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