
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, Shield, TrendingUp } from 'lucide-react';

const InvestmentPlatforms = () => {
  const handleVisitPlatform = (url: string) => {
    window.open(url, '_blank');
  };

  const corretoras = [
    {
      name: 'XP Investimentos',
      url: 'https://www.xpi.com.br',
      description: 'Uma das maiores corretoras do Brasil, ideal para investidores experientes',
      rating: 4.8,
      category: 'Premium',
      features: ['Análises exclusivas', 'Amplo portfólio', 'Atendimento especializado']
    },
    {
      name: 'Rico Investimentos',
      url: 'https://www.rico.com.vc',
      description: 'Corretora com foco em democratização dos investimentos',
      rating: 4.6,
      category: 'Intermediária',
      features: ['Taxa zero em ações', 'Plataforma intuitiva', 'Educação financeira']
    },
    {
      name: 'Clear Corretora',
      url: 'https://www.clear.com.br',
      description: 'Corretora do Grupo XP com foco em simplicidade',
      rating: 4.5,
      category: 'Iniciante',
      features: ['Interface simples', 'Sem taxa de corretagem', 'Suporte educativo']
    },
    {
      name: 'BTG Pactual',
      url: 'https://www.btg.com.br',
      description: 'Banco de investimentos com soluções completas',
      rating: 4.7,
      category: 'Premium',
      features: ['Research exclusivo', 'Private banking', 'Produtos sofisticados']
    },
    {
      name: 'ModalMais',
      url: 'https://www.modalmais.com.br',
      description: 'Corretora independente com foco em tecnologia',
      rating: 4.4,
      category: 'Intermediária',
      features: ['Plataforma robusta', 'Custos competitivos', 'Atendimento qualificado']
    },
    {
      name: 'Inter Invest',
      url: 'https://www.bancointer.com.br/investimentos',
      description: 'Investimentos integrados ao banco digital',
      rating: 4.3,
      category: 'Iniciante',
      features: ['Conta integrada', 'App simplificado', 'Sem taxa de abertura']
    },
    {
      name: 'NuInvest',
      url: 'https://www.nubank.com.br/investimentos',
      description: 'Plataforma de investimentos do Nubank',
      rating: 4.2,
      category: 'Iniciante',
      features: ['Integração com Nubank', 'Interface amigável', 'Produtos simples']
    },
    {
      name: 'Órama Investimentos',
      url: 'https://www.orama.com.br',
      description: 'Corretora independente com foco em atendimento',
      rating: 4.5,
      category: 'Intermediária',
      features: ['Atendimento personalizado', 'Plataforma completa', 'Educação financeira']
    },
    {
      name: 'Toro Investimentos',
      url: 'https://www.toroinvestimentos.com.br',
      description: 'Corretora digital com foco em inovação',
      rating: 4.1,
      category: 'Iniciante',
      features: ['Tecnologia avançada', 'Interface moderna', 'Custos baixos']
    }
  ];

  const plataformasOficiais = [
    {
      name: 'Tesouro Direto',
      url: 'https://www.tesourodireto.com.br',
      description: 'Plataforma oficial para investimento em títulos públicos',
      icon: <Shield className="w-6 h-6 text-green-600" />,
      type: 'Governo Federal',
      features: ['Segurança máxima', 'Baixo risco', 'Ideal para iniciantes']
    },
    {
      name: 'B3 - Bolsa do Brasil',
      url: 'https://www.b3.com.br',
      description: 'Bolsa de valores oficial do Brasil',
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      type: 'Bolsa de Valores',
      features: ['Ações', 'FIIs', 'ETFs', 'Derivativos']
    },
    {
      name: 'CVM',
      url: 'https://www.gov.br/cvm',
      description: 'Órgão regulador do mercado de capitais',
      icon: <Shield className="w-6 h-6 text-red-600" />,
      type: 'Órgão Regulador',
      features: ['Regulamentação', 'Fiscalização', 'Proteção ao investidor']
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediária': return 'bg-blue-100 text-blue-800';
      case 'Premium': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Plataformas Oficiais */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Plataformas Oficiais e Segurança</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {plataformasOficiais.map((platform, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {platform.icon}
                  <div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">{platform.type}</Badge>
                  </div>
                </div>
                <CardDescription>{platform.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {platform.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleVisitPlatform(platform.url)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Acessar Site
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Corretoras */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Corretoras de Investimentos</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {corretoras.map((corretora, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{corretora.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{corretora.rating}</span>
                  </div>
                </div>
                <Badge className={getCategoryColor(corretora.category)}>
                  {corretora.category}
                </Badge>
                <CardDescription>{corretora.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {corretora.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleVisitPlatform(corretora.url)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visitar Corretora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlatforms;
