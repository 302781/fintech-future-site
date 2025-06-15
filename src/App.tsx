
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import PorqueNos from "./pages/PorqueNos";
import Equipe from "./pages/Equipe";
import Login from "./pages/Login";
import EducacaoInfantil from "./pages/EducacaoInfantil";
import Cursos from "./pages/Cursos";
import Simuladores from "./pages/Simuladores";
import AssinaturasCorporativas from "./pages/AssinaturasCorporativas";
import FAQ from "./pages/FAQ";
import FormularioPagamento from "./pages/FormularioPagamento";
import ConsultoresFinanceiros from "./pages/ConsultoresFinanceiros";
import EscolaBasica from "./pages/EscolaBasica";
import EscolaPremium from "./pages/EscolaPremium";
import RedeEnsino from "./pages/RedeEnsino";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import CursosBasico from "./pages/CursosBasico";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/porque-nos" element={<PorqueNos />} />
            <Route path="/educacao" element={<EducacaoInfantil />} />
            <Route path="/simuladores" element={<Simuladores />} />
            <Route path="/corporativo" element={<AssinaturasCorporativas />} />
            <Route path="/escola-basica" element={<EscolaBasica />} />
            <Route path="/escola-premium" element={<EscolaPremium />} />
            <Route path="/rede-ensino" element={<RedeEnsino />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pagamento" element={<FormularioPagamento />} />
            <Route path="/consultores" element={<ConsultoresFinanceiros />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
