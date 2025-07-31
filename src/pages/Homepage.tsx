// src/pages/HomePage.tsx (ou Index.tsx)
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'; // Certifique-se que Link está importado
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <Hero />
        <Services />

        {/* Seção de Chamada para Ação (CTA) - Podemos adicionar um botão de login aqui para teste */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pronto para Transformar suas Finanças?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Junte-se a milhares de pessoas que já descobriram o poder da educação financeira
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-4 h-auto group"
              >
                <Link to="/planos" className="flex items-center" aria-label="Explore nossos planos de educação financeira">
                  Explore Nossos Planos
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </Button>
              {/* ADICIONE ESTE BOTÃO/LINK PARA LOGIN */}
              <Button
                asChild
                size="lg"
                variant="outline" // Use a variante 'outline' ou 'ghost' para um estilo secundário
                className="border-[#1A247E] text-[#1A247E] hover:bg-[#1A247E] hover:text-white text-lg px-8 py-4 h-auto"
              >
                <Link to="/login" aria-label="Acessar sua conta ou fazer login">
                  Fazer Login
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;