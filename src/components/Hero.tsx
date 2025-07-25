import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="fintech-gradient min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto Principal */}
          <div className="animate-fadeInUp">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8">
              APRENDA A{' '}
              <span className="hero-text">ECONOMIZAR</span>
              <br />
              <span className="hero-text">INVESTIR</span> E{' '}
              <span className="hero-text">PLANEJAR</span>
              <br />
              SEU FUTURO!
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-lg">
              Transforme sua relação com o dinheiro e construa o futuro financeiro que você sempre sonhou.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Ajuste o link para '/planos' se essa for a rota definida no App.tsx */}
              <Link to="/planos"> 
                <Button 
                  size="lg" 
                  className="bg-white text-[#1A247E] hover:bg-blue-50 text-lg px-8 py-4 h-auto font-semibold group"
                >
                  Comece Agora
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link to="/sobre">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#1A247E] text-lg px-8 py-4 h-auto"
                >
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>

          {/* Imagem/Gráfico */}
          <div className="relative animate-fadeInUp">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 animate-pulse-slow">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Dashboard Financeiro"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-300/30 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;