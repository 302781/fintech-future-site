import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
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
            <Button
              asChild
              size="lg"
              className="bg-[#1A247E] hover:bg-[#2D4DE0] text-lg px-8 py-4 h-auto group"
            >
              {/* O link "Explore Nossos Planos" está correto aqui, apontando para /planos */}
              <Link to="/planos" className="flex items-center" aria-label="Explore nossos planos de educação financeira">
                Explore Nossos Planos
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer /> 
    </div>
  );
};

export default HomePage;