
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/simuladores" element={<Simuladores />} />
          <Route path="/corporativo" element={<AssinaturasCorporativas />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pagamento" element={<FormularioPagamento />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
