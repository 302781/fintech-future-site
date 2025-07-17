// src/components/InvestmentPlatforms.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react'; // Ícone para links externos

// Definição das interfaces (deve ser a mesma que em Cursos.tsx)
interface PlatformItem {
  id: string;
  name: string;
  description: string;
  link: string;
  icon?: string;
}

interface InvestmentPlatformsProps {
  platforms: PlatformItem[]; // A prop 'platforms' é um array de PlatformItem
  IconMap: { [key: string]: React.ElementType }; // A prop 'IconMap' é um objeto de mapeamento de ícones
}

const InvestmentPlatforms: React.FC<InvestmentPlatformsProps> = ({ platforms, IconMap }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#1A247E] mb-6">Plataformas de Investimento</h2>
      {platforms.length === 0 ? (
        <p className="text-gray-600">Nenhuma plataforma de investimento recomendada para este plano no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const IconComponent = platform.icon ? IconMap[platform.icon] : null;
            return (
              <Card key={platform.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    {IconComponent && <IconComponent className="w-8 h-8 text-[#1A247E]" />}
                    <CardTitle className="text-xl font-semibold text-gray-800">{platform.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{platform.description}</p>
                  {platform.link && (
                    <Button asChild className="mt-4 bg-[#1A247E] hover:bg-[#2D4DE0]">
                      <a href={platform.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Visitar Plataforma
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InvestmentPlatforms;
