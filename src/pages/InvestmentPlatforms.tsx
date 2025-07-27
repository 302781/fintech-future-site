import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react'; 

// Interface para um item de plataforma de investimento
interface PlatformItem {
  id: string; // ID único da plataforma
  name: string;
  description: string;
  link: string;
  icon?: string; // Nome do ícone como string, será mapeado para o componente React
}

// Propriedades esperadas pelo componente InvestmentPlatforms
interface InvestmentPlatformsProps {
  platforms: PlatformItem[]; // Array de plataformas a serem exibidas
  IconMap: { [key: string]: React.ElementType }; // Mapeamento de nomes de string para componentes de ícone
}

/**
 * Componente InvestmentPlatforms
 * Exibe uma lista de plataformas de investimento em formato de cards.
 * Permite que o usuário explore a descrição e acesse o link da plataforma.
 */
const InvestmentPlatforms: React.FC<InvestmentPlatformsProps> = ({ platforms, IconMap }) => {
  // Exibe uma mensagem de fallback se não houver plataformas disponíveis
  if (!platforms || platforms.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>Nenhuma plataforma de investimento disponível no momento para o seu plano.</p>
        <p className="mt-2 text-sm">Verifique as configurações do seu plano ou entre em contato com o suporte.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {platforms.map((platform) => {
        // Obtém o componente do ícone a partir do nome da string usando o IconMap
        const IconComponent = platform.icon ? IconMap[platform.icon] : null; 
        
        return (
          <Card 
            key={platform.id} 
            className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="flex-grow p-6">
              <div className="flex items-start mb-4">
                {/* Renderiza o ícone se o componente for encontrado no IconMap */}
                {IconComponent && <IconComponent className="w-8 h-8 text-[#1A247E] mr-3 flex-shrink-0" />}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{platform.name}</h3>
                  <p className="text-sm text-gray-600">{platform.description}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 text-right">
                {/* Link externo para a plataforma */}
                <a 
                  href={platform.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Acessar plataforma ${platform.name}`} // Melhoria de acessibilidade
                >
                  <Button variant="outline" className="border-[#1A247E] text-[#1A247E] hover:bg-[#1A247E] hover:text-white">
                    Acessar Plataforma <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InvestmentPlatforms;
