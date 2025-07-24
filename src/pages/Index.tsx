import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import { Card, CardContent } from '@/components/ui/card'; // Embora não usados diretamente neste snippet, mantidos
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, TrendingUp } from 'lucide-react'; // Mudei ArrowLeft para ArrowRight para o CTA
import { Link } from 'react-router-dom';

const Index = () => {

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pronto para Transformar suas Finanças?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se a milhares de pessoas que já descobriram o poder da educação financeira
          </p>
          <Link to="/planos">
            <Button
              size="lg"
              className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-4 h-auto group">
                
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              Explore Nossos Planos
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">FinTech</h3>
              <p className="text-gray-400">
                Transformando vidas através da educação financeira
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                <li><Link to="/equipe" className="hover:text-white transition-colors">Equipe</Link></li>
                <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li> 
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/servicos" className="hover:text-white transition-colors">Serviços</Link></li>
                <li><Link to="/porque-nos" className="hover:text-white transition-colors">PorQue Nos?</Link></li>
                <Link to="/educacao-e-corporativo" className="hover:text-white transition-colors">Educação & Empresas</Link>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/faq" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><Link to="/seguranca">Configurações de Segurança</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FinTech. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;