import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InvestmentInputData {
  initialValue: string;
  monthlyValue: string;
  period: string; 
  rate: string;   
}
interface InvestmentResult {
  finalValue: number;
  totalInvested: number;
  earnings: number;
}
interface RetirementInputData {
  currentAge: string;
  retirementAge: string;
  monthlyIncome: string; 
  desiredIncome: string;
}

interface RetirementResult {
  neededCapital: number;
  monthlyContribution: number;
  yearsToRetire: number;
}
const Simuladores: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState<'investimento' | 'aposentadoria'>('investimento');
  
  const [investmentData, setInvestmentData] = useState<InvestmentInputData>({
    initialValue: '',
    monthlyValue: '',
    period: '',
    rate: ''
  });

  const [retirementData, setRetirementData] = useState<RetirementInputData>({
    currentAge: '',
    retirementAge: '',
    monthlyIncome: '',
    desiredIncome: ''
  });

    const calculateInvestment = (): InvestmentResult => {
    const initial = parseFloat(investmentData.initialValue.replace(',', '.')) || 0; // Tratar vírgula
    const monthly = parseFloat(investmentData.monthlyValue.replace(',', '.')) || 0;
    const months = parseInt(investmentData.period) || 0;
    const annualRate = parseFloat(investmentData.rate.replace(',', '.')) || 0;

    if (months <= 0 || annualRate < 0) { // Validação básica
        return { finalValue: initial, totalInvested: initial, earnings: 0 };
    }

    const monthlyRate = annualRate / 100 / 12; // Taxa mensal

    let total = initial;
    for (let i = 0; i < months; i++) {
      total = total * (1 + monthlyRate) + monthly;
    }

    const totalInvested = initial + (monthly * months);
    const earnings = total - totalInvested;

    return {
      finalValue: total,
      totalInvested: totalInvested,
      earnings: earnings
    };
  };

   const calculateRetirement = (): RetirementResult => {
    const currentAge = parseInt(retirementData.currentAge) || 0;
    const retirementAge = parseInt(retirementData.retirementAge) || 0;
    const desiredIncome = parseFloat(retirementData.desiredIncome.replace(',', '.')) || 0;

    // Validações básicas
    if (currentAge <= 0 || retirementAge <= currentAge || desiredIncome <= 0) {
        return { neededCapital: 0, monthlyContribution: 0, yearsToRetire: 0 };
    }

   const neededCapital = desiredIncome * (25 * 12); // Capital para 25 anos de renda desejada

    const yearsToRetire = retirementAge - currentAge;
    const monthsToRetire = yearsToRetire * 12;
    const monthlyContribution = monthsToRetire > 0 ? neededCapital / monthsToRetire : 0;

    return {
      neededCapital,
      monthlyContribution,
      yearsToRetire
    };
  };

 const simulatorsConfig = {
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
      {/* Remova Navigation se este componente for um filho via <Outlet> em EscolaBasica */}
      {/* <Navigation /> */} 
      
      <div className="pt-8 sm:pt-16 md:pt-20"> {/* Ajustado padding top para melhor visualização */}
        {/* Header */}
        <section className="fintech-gradient py-12 md:py-20"> {/* Ajustado padding */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Simuladores Financeiros
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Ferramentas gratuitas para planejar seu futuro financeiro
            </p>
          </div>
        </section>

        {/* Simulator Selection */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="flex bg-white rounded-lg shadow-lg p-1.5 md:p-2"> {/* Ajustado padding */}
                {Object.entries(simulatorsConfig).map(([key, simulator]) => (
                  <Button
                    key={key}
                    onClick={() => setSelectedSimulator(key as 'investimento' | 'aposentadoria')}
                    variant={selectedSimulator === key ? "default" : "ghost"}
                    className={`mx-0.5 md:mx-1 ${selectedSimulator === key ? 'bg-[#1A247E] text-white hover:bg-[#1A247E]/90' : 'hover:bg-gray-100'} rounded-md text-sm md:text-base px-3 py-2 transition-colors duration-200`}
                  >
                    {simulator.title.replace('Simulador de ', '')}
                  </Button>
                ))}
              </div>
            </div>

            <Card className="max-w-4xl mx-auto shadow-xl"> {/* Adicionado shadow */}
              <CardHeader className="text-center pb-4 md:pb-6"> {/* Ajustado padding */}
                <CardTitle className="text-2xl md:text-3xl text-gray-900">
                  {simulatorsConfig[selectedSimulator].title}
                </CardTitle>
                <CardDescription className="text-md md:text-lg text-gray-600">
                  {simulatorsConfig[selectedSimulator].description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 md:p-8"> {/* Ajustado padding */}
                {selectedSimulator === 'investimento' && (
                  <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-5"> {/* Ajustado spacing */}
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Dados do Investimento</h3>
                      
                      <div>
                        <Label htmlFor="initialValue" className="mb-1 block text-sm font-medium text-gray-700">Valor Inicial (R$)</Label>
                        <Input
                          id="initialValue"
                          type="text" // Alterado para text para facilitar a substituição de vírgulas
                          inputMode="numeric"
                          pattern="[0-9]*[.,]?[0-9]*" // Permite ponto ou vírgula
                          placeholder="1.000,00"
                          value={investmentData.initialValue}
                          onChange={(e) => setInvestmentData({...investmentData, initialValue: e.target.value})}
                          className="focus:ring-[#1A247E] focus:border-[#1A247E]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="monthlyValue" className="mb-1 block text-sm font-medium text-gray-700">Valor Mensal (R$)</Label>
                        <Input
                          id="monthlyValue"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*[.,]?[0-9]*"
                          placeholder="500,00"
                          value={investmentData.monthlyValue}
                          onChange={(e) => setInvestmentData({...investmentData, monthlyValue: e.target.value})}
                          className="focus:ring-[#1A247E] focus:border-[#1A247E]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="period" className="mb-1 block text-sm font-medium text-gray-700">Período (meses)</Label>
                        <Input
                          id="period"
                          type="number"
                          placeholder="60"
                          value={investmentData.period}
                          onChange={(e) => setInvestmentData({...investmentData, period: e.target.value})}
                          className="focus:ring-[#1A247E] focus:border-[#1A247E]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="rate" className="mb-1 block text-sm font-medium text-gray-700">Taxa de Juros (% ao ano)</Label>
                        <Input
                          id="rate"
                          type="text"
                          inputMode="decimal"
                          pattern="[0-9]*[.,]?[0-9]*"
                          placeholder="10,0"
                          step="0.1"
                          value={investmentData.rate}
                          onChange={(e) => setInvestmentData({...investmentData, rate: e.target.value})}
                          className="focus:ring-[#1A247E] focus:border-[#1A247E]"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner"> {/* Adicionado shadow-inner */}
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Resultado da Simulação</h3>
                      {(investmentData.initialValue || investmentData.monthlyValue) && investmentData.period && investmentData.rate ? (
                        <div className="space-y-4">
                            {(() => {
                                const result = calculateInvestment();
                                return (
                                    <>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Valor Final:</span>
                                            <span className="font-bold text-xl text-green-600">
                                                R$ {result.finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Total Investido:</span>
                                            <span className="font-semibold text-lg text-gray-800">
                                                R$ {result.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">Rendimento:</span>
                                            <span className="font-bold text-lg text-blue-600">
                                                R$ {result.earnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 mt-4">Preencha os campos para ver o resultado.</p>
                      )}
                    </div>
                  </div>
                )}

                {selectedSimulator === 'aposentadoria' && (
                  <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-5">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Dados Pessoais</h3>
                      
                      <div>
                        <Label htmlFor="currentAge" className="mb-1 block text-sm font-medium text-gray-700">Idade Atual</Label>
                        <Input
                          id="currentAge"
                          type="number"
                          placeholder="30"
                          value={retirementData.currentAge}
                          onChange={(e) => setRetirementData({...retirementData, currentAge: e.target.value})}
                          className="focus:ring-[#1A247E] focus:border-[#1A247E]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="retirementAge" className="mb-1 block text-sm font-medium text-gray-700">Idade de Aposentadoria</Label>
                        <Input
                          id="retirementAge"
                          type="number"
                          placeholder="65"
                          value={retirementData.retirementAge}
                          onChange={(e) => setRetirementData({...retirementData, retirementAge: e.target.value})}
                          className="focus:ring-[#1A247E] focus:border-[#1A247E]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="monthlyIncome" className="mb-1 block text-sm font-medium text-gray-700">Renda Mensal Atual (R$)</Label>
                        <Input
                          id="monthlyIncome"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*[.,]?[0-9]*"
                          placeholder="5.000,00"
                          value={retirementData.monthlyIncome}
                          onChange={(e) => setRetirementData({...retirementData, monthlyIncome: e.target.value})}
                          className="focus:ring-[#1A247E] focus:border-[#1A247E]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="desiredIncome" className="mb-1 block text-sm font-medium text-gray-700">Renda Desejada na Aposentadoria (R$)</Label>
                        <Input
                          id="desiredIncome"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*[.,]?[0-9]*"
                          placeholder="4.000,00"
                          value={retirementData.desiredIncome}
                          onChange={(e) => setRetirementData({...retirementData, desiredIncome: e.target.value})}
                          className="focus:ring-[#1A247E] focus:border-[#1A247E]"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Plano de Aposentadoria</h3>
                      {retirementData.currentAge && retirementData.retirementAge && retirementData.desiredIncome && 
                       (parseInt(retirementData.retirementAge) > parseInt(retirementData.currentAge)) ? ( // Adicionada validação de idade
                        <div className="space-y-4">
                            {(() => {
                                const result = calculateRetirement();
                                return (
                                    <>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Anos para aposentar:</span>
                                            <span className="font-bold text-lg text-gray-800">{result.yearsToRetire} anos</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                            <span className="text-gray-600">Capital necessário:</span>
                                            <span className="font-bold text-xl text-blue-600">
                                                R$ {result.neededCapital.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">Investimento mensal sugerido:</span>
                                            <span className="font-bold text-lg text-green-600">
                                                R$ {result.monthlyContribution.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 mt-4">Preencha e verifique as idades para ver o plano de aposentadoria.</p>
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
