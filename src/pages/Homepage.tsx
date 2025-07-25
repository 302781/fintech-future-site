import React from 'react';
import Navigation from '@/components/Navigation'; // Certifique-se de que este caminho está correto para o seu componente de navegação
import Hero from '@/components/Hero'; // Importa o seu componente Hero
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer'; 
const PlanosSection: React.FC = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold text-[#1A247E] mb-8">Conheça Nossos Planos</h2>
      <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
        Oferecemos planos flexíveis para indivíduos, famílias e instituições. Encontre o ideal para você e comece a transformar suas finanças!
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {/* Cartão Resumido do Plano Individual */}
        <div className="bg-gray-50 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">Plano Individual</h3>
          <p className="text-gray-600 mb-4 h-20 flex items-center justify-center">Ideal para quem busca começar a organizar suas finanças pessoais.</p> {/* Adicionei h-20 e flex para alinhar o texto */}
          <span className="text-3xl font-bold text-green-600">R$49</span><span className="text-lg text-gray-600">/mês</span>
          <Link to="/planos" className="block mt-6">
            <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]">Ver Detalhes</Button>
          </Link>
        </div>

        {/* Cartão Resumido do Plano Premium */}
        <div className="bg-gray-50 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">Plano Premium</h3>
          <p className="text-gray-600 mb-4 h-20 flex items-center justify-center">Para quem busca acompanhamento e ferramentas avançadas de investimento.</p>
          <span className="text-3xl font-bold text-green-600">R$99</span><span className="text-lg text-gray-600">/mês</span>
          <Link to="/planos" className="block mt-6">
            <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]">Ver Detalhes</Button>
          </Link>
        </div>

        {/* Cartão Resumido do Plano Corporativo */}
        <div className="bg-gray-50 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">Plano Corporativo</h3>
          <p className="text-gray-600 mb-4 h-20 flex items-center justify-center">Soluções educacionais financeiras personalizadas para escolas e empresas.</p>
          <span className="text-3xl font-bold text-green-600">Sob Consulta</span>
          {/* Lembre-se: 'plano=corporativo' é o parâmetro para o formulário específico */}
          <Link to="/contratar-plano?plano=corporativo" className="block mt-6">
            <Button className="w-full bg-[#1A247E] hover:bg-[#2D4DE0]">Solicitar Orçamento</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- Componente da Página Inicial Principal ---
const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100"> {/* Fundo leve para a página */}
      <Navigation /> {/* Sua barra de navegação */}
      <Hero /> {/* O seu componente Hero, que é a primeira seção */}
      <PlanosSection /> {/* A seção resumida dos planos */}
      {/* Aqui você pode adicionar outras seções da sua home page, como: */}
      {/* <AboutUsSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <ContactCallToAction /> */}
      <Footer /> 
    </div>
  );
};

export default HomePage;