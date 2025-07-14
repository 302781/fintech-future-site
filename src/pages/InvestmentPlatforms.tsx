// src/components/InvestmentPlatforms.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import React from 'react'; // Importar React para usar React.ReactNode

interface Platform {
  id: string;
  name: string;
  description: string;
  link: string;
  icon: React.ReactNode; // Ícone para a plataforma
}

interface InvestmentPlatformsProps {
  platforms: Platform[];
}

const InvestmentPlatforms = ({ platforms }: InvestmentPlatformsProps) => {
  if (platforms.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p className="text-lg mb-4">No momento, seu plano não inclui acesso direto a plataformas de investimento.</p>
        <p>Considere fazer um upgrade para ter acesso a mais recursos e guias sobre como e onde aplicar!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {platforms.map((platform) => (
        <Card key={platform.id} className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <div className="flex-shrink-0">{platform.icon}</div>
            <CardTitle className="text-xl font-bold text-gray-900">{platform.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 text-sm">{platform.description}</p>
            <Button asChild className="w-full bg-gray-700 hover:bg-gray-800">
              <a href={platform.link} target="_blank" rel="noopener noreferrer">
                Acessar Plataforma <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InvestmentPlatforms;