import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom'; // Adicionado useParams e Navigate
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./contexts/AuthContextHook"; 

//Inicio
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import PorqueNos from "./pages/PorqueNos";
import EducacaoECorporativo from './pages/EducacaoECorporativo';
import Equipe from "./pages/Equipe";
//Assinaturas
import AssinaturasCorporativas from "./pages/AssinaturasCorporativas";
import PlanosCorporativosForm from './pages/PlanosCorporativosForm'; 
import Homepage from './pages/Homepage';
import CheckoutForm from "./pages/PaymentForm";
import PlanosPage from './pages/PlanosPage';
import { investmentPlatformsData, InvestmentIconMap } from './data/investmentPlatformsData';
import CheckoutPage from './pages/CheckountPage'; 
import ReciboPage from './pages/ReciboPage';
import EscolaPremium from "./pages/EscolaPremium";
import EscolaBasica from "./pages/EscolaBasica";
import RedeEnsino from "./pages/RedeEnsino";
import InvestmentPlatforms from "./pages/InvestmentPlatforms";
import ConsultoresFinanceiros from "./pages/ConsultoresFinanceiros"; 
//Entrar
import Login from "./pages/Login";
import AdminDashboard from './components/AdminDashboard';
//Contato e Ajuda
import ContactPage from './pages/ContactPage';
import Consultores from './components/Consultores';
import FAQ from "./pages/FAQ";
//Cursos
import CourseContent from "./pages/CourseContent";
import { courseContentData, CourseIconMap } from './data/courseContentData';
import Aulas from "./pages/Aulas";
import Cursos from "./pages/Cursos";
import Simuladores from "./pages/Simuladores";
import BibliotecaCompleta from './pages/BibliotecaCompleta';
import Biblioteca from './pages/Biblioteca';
import VideoPlayer from "./components/VideoPlayer";
import GamePlayer from "./components/GamePlayer/GamePlayer";
//Configurações
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import SettingsPage from "./pages/SettingsPage";
import SecuritySettingPage from "./components/SecuritySettingPage";
import PrivateRoute from './components/PrivateRoute'; 
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

  // Se o usuário não estiver logado, redirecione para a página de login
  if (!user) {
    return <Navigate to="/login" replace />; // Usando o componente Navigate importado
  }

  return <>{children}</>;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <Routes>
        //Inicio
        <Route path="/" element={<Index />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/porque-nos" element={<PorqueNos />} />
        <Route path="/educacao-e-corporativo" element={<EducacaoECorporativo />} />
        <Route path="/equipe" element={<Equipe />} />
        // Assinaturas
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/assinaturas-corporativas" element={<AssinaturasCorporativas />} />
        <Route path="/consultores-financeiros" element={<ConsultoresFinanceiros />} />
        <Route path="/planos-corporativos" element={<PlanosCorporativosForm />} />
        <Route path="/paymentform" element={<CheckoutForm />} />
        <Route path="/planos" element={<PlanosPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/recibo" element={<ReciboPage />} />
        <Route path="/escola-premium" element={<EscolaPremium />} />
        <Route path="/escola-basica" element={<EscolaBasica />} />
        <Route path="/rede-ensino" element={<RedeEnsino />} />
        <Route path="/pagamento" element={<CheckoutForm />} />
        // Entrar
        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRouteComponent><AdminDashboard /></PrivateRouteComponent>} />
        //Contato e Ajuda
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/faq" element={<FAQ />} />

        //Cursos
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
        <Route path="/investment-plataforms"element={<InvestmentPlatforms platforms={investmentPlatformsData} IconMap={InvestmentIconMap} />}/>
        <Route path="/course-content"element={<CourseContent courses={courseContentData} IconMap={CourseIconMap} />}/>
         <Route path="/cursos-basico" element={
            <PrivateRouteComponent> 
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

        // Configurações
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/settings"element={
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