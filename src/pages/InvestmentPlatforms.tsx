// src/components/InvestmentPlatforms.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react'; // Ícone padrão para o link

// Tipos, se não estiverem em um arquivo de tipos global
interface PlatformItem {
  id: string;
  name: string;
  description: string;
  link: string;
  icon?: string;
}

interface InvestmentPlatformsProps {
  platforms: PlatformItem[];
  IconMap: { [key: string]: React.ElementType }; // Adicionar IconMap como prop
}

const InvestmentPlatforms: React.FC<InvestmentPlatformsProps> = ({ platforms, IconMap }) => {
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
        const IconComponent = platform.icon ? IconMap[platform.icon] : null; // Obtém o componente do ícone
        return (
          <Card key={platform.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
            <CardContent className="flex-grow p-6">
              <div className="flex items-start mb-4">
                {IconComponent && <IconComponent className="w-8 h-8 text-[#1A247E] mr-3 flex-shrink-0" />}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{platform.name}</h3>
                  <p className="text-sm text-gray-600">{platform.description}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 text-right">
                <a href={platform.link} target="_blank" rel="noopener noreferrer">
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