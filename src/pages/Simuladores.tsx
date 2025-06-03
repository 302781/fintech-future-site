
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Simuladores = () => {
  const [selectedSimulator, setSelectedSimulator] = useState('investimento');
  
  // Estados para simulador de investimento
  const [investmentData, setInvestmentData] = useState({
    initialValue: '',
    monthlyValue: '',
    period: '',
    rate: ''
  });
  
  // Estados para simulador de aposentadoria
  const [retirementData, setRetirementData] = useState({
    currentAge: '',
    retirementAge: '',
    monthlyIncome: '',
    desiredIncome: ''
  });

  const calculateInvestment = () => {
    const initial = parseFloat(investmentData.initialValue) || 0;
    const monthly = parseFloat(investmentData.monthlyValue) || 0;
    const months = parseInt(investmentData.period) || 0;
    const monthlyRate = (parseFloat(investmentData.rate) || 0) / 100 / 12;

    let total = initial;
    for (let i = 0; i < months; i++) {
      total = total * (1 + monthlyRate) + monthly;
    }

    return {
      finalValue: total,
      totalInvested: initial + (monthly * months),
      earnings: total - (initial + (monthly * months))
    };
  };

  const calculateRetirement = () => {
    const yearsToRetire = parseInt(retirementData.retirementAge) - parseInt(retirementData.currentAge);
    const monthsToRetire = yearsToRetire * 12;
    const currentIncome = parseFloat(retirementData.monthlyIncome) || 0;
    const desiredIncome = parseFloat(retirementData.desiredIncome) || 0;
    const neededCapital = desiredIncome * 300; // Regra simples: 25 anos de aposentadoria
    const monthlyContribution = neededCapital / monthsToRetire;

    return {
      neededCapital,
      monthlyContribution,
      yearsToRetire
    };
  };

  const simulators = {
    investimento: {
      title: "Simulador de Investimentos",
      description: "Calcule quanto seu dinheiro pode render ao longo do tempo"
    },
    aposentadoria: {
      title: "Simulador de Aposentadoria",
      description: "Planeje sua aposentadoria e descubra quanto precisa investir"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <section className="fintech-gradient py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Simuladores Financeiros
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ferramentas gratuitas para planejar seu futuro financeiro
            </p>
          </div>
        </section>

        {/* Simulator Selection */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-12">
              <div className="flex bg-white rounded-lg shadow-lg p-2">
                {Object.entries(simulators).map(([key, simulator]) => (
                  <Button
                    key={key}
                    onClick={() => setSelectedSimulator(key)}
                    variant={selectedSimulator === key ? "default" : "ghost"}
                    className={`mx-1 ${selectedSimulator === key ? 'bg-[#1A247E] text-white' : ''}`}
                  >
                    {simulator.title.replace('Simulador de ', '')}
                  </Button>
                ))}
              </div>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-gray-900">
                  {simulators[selectedSimulator].title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {simulators[selectedSimulator].description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                {selectedSimulator === 'investimento' && (
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Dados do Investimento</h3>
                      
                      <div>
                        <Label htmlFor="initialValue">Valor Inicial (R$)</Label>
                        <Input
                          id="initialValue"
                          type="number"
                          placeholder="1000"
                          value={investmentData.initialValue}
                          onChange={(e) => setInvestmentData({...investmentData, initialValue: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="monthlyValue">Valor Mensal (R$)</Label>
                        <Input
                          id="monthlyValue"
                          type="number"
                          placeholder="500"
                          value={investmentData.monthlyValue}
                          onChange={(e) => setInvestmentData({...investmentData, monthlyValue: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="period">Período (meses)</Label>
                        <Input
                          id="period"
                          type="number"
                          placeholder="60"
                          value={investmentData.period}
                          onChange={(e) => setInvestmentData({...investmentData, period: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="rate">Taxa de Juros (% ao ano)</Label>
                        <Input
                          id="rate"
                          type="number"
                          placeholder="10"
                          step="0.1"
                          value={investmentData.rate}
                          onChange={(e) => setInvestmentData({...investmentData, rate: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Resultado da Simulação</h3>
                      {investmentData.initialValue && investmentData.period && investmentData.rate && (
                        <div className="space-y-4">
                          {(() => {
                            const result = calculateInvestment();
                            return (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Valor Final:</span>
                                  <span className="font-bold text-green-600">
                                    R$ {result.finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Investido:</span>
                                  <span className="font-semibold">
                                    R$ {result.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Rendimento:</span>
                                  <span className="font-bold text-blue-600">
                                    R$ {result.earnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedSimulator === 'aposentadoria' && (
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Dados Pessoais</h3>
                      
                      <div>
                        <Label htmlFor="currentAge">Idade Atual</Label>
                        <Input
                          id="currentAge"
                          type="number"
                          placeholder="30"
                          value={retirementData.currentAge}
                          onChange={(e) => setRetirementData({...retirementData, currentAge: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="retirementAge">Idade de Aposentadoria</Label>
                        <Input
                          id="retirementAge"
                          type="number"
                          placeholder="65"
                          value={retirementData.retirementAge}
                          onChange={(e) => setRetirementData({...retirementData, retirementAge: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="monthlyIncome">Renda Mensal Atual (R$)</Label>
                        <Input
                          id="monthlyIncome"
                          type="number"
                          placeholder="5000"
                          value={retirementData.monthlyIncome}
                          onChange={(e) => setRetirementData({...retirementData, monthlyIncome: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="desiredIncome">Renda Desejada na Aposentadoria (R$)</Label>
                        <Input
                          id="desiredIncome"
                          type="number"
                          placeholder="4000"
                          value={retirementData.desiredIncome}
                          onChange={(e) => setRetirementData({...retirementData, desiredIncome: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Plano de Aposentadoria</h3>
                      {retirementData.currentAge && retirementData.retirementAge && retirementData.desiredIncome && (
                        <div className="space-y-4">
                          {(() => {
                            const result = calculateRetirement();
                            return (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Anos para aposentar:</span>
                                  <span className="font-bold">{result.yearsToRetire} anos</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Capital necessário:</span>
                                  <span className="font-bold text-blue-600">
                                    R$ {result.neededCapital.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Investimento mensal:</span>
                                  <span className="font-bold text-green-600">
                                    R$ {result.monthlyContribution.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Simuladores;
