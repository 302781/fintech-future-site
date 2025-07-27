import React, { useState, useCallback, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// --- Interfaces para Tipagem dos Dados ---
interface InvestmentInputData {
  initialValue: string;
  monthlyValue: string;
  period: string; // Período em meses
  rate: string;   // Taxa anual em porcentagem
}

interface InvestmentResult {
  finalValue: number;
  totalInvested: number;
  earnings: number;
}

interface RetirementInputData {
  currentAge: string;
  retirementAge: string;
  monthlyIncome: string; // Renda mensal atual
  desiredIncome: string; // Renda desejada na aposentadoria
  expectedAnnualReturn: string; // Nova entrada: Taxa de retorno esperada dos investimentos (em porcentagem)
}

interface RetirementResult {
  neededCapital: number;
  monthlyContribution: number;
  yearsToRetire: number;
}

interface InputErrors {
  [key: string]: string | undefined;
}

// --- Funções Auxiliares de Formatação e Parsing ---

// Converte string de valor monetário (ex: "1.000,50") para number (ex: 1000.50)
const parseCurrencyToNumber = (value: string): number => {
  if (!value) return 0;
  // Remove pontos de milhar e substitui vírgula por ponto decimal
  const cleanedValue = value.replace(/\./g, '').replace(/,/g, '.');
  return parseFloat(cleanedValue) || 0;
};

// Formata um número para string de moeda brasileira
const formatNumberToCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// --- Componente Principal Simuladores ---
const Simuladores: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState<'investimento' | 'aposentadoria'>('investimento');

  const [investmentData, setInvestmentData] = useState<InvestmentInputData>({
    initialValue: '',
    monthlyValue: '',
    period: '',
    rate: ''
  });
  const [investmentErrors, setInvestmentErrors] = useState<InputErrors>({});

  const [retirementData, setRetirementData] = useState<RetirementInputData>({
    currentAge: '',
    retirementAge: '',
    monthlyIncome: '',
    desiredIncome: '',
    expectedAnnualReturn: ''
  });
  const [retirementErrors, setRetirementErrors] = useState<InputErrors>({});

  // --- Lógica do Simulador de Investimentos ---
  const validateInvestmentInputs = useCallback(() => {
    const errors: InputErrors = {};
    const initial = parseCurrencyToNumber(investmentData.initialValue);
    const monthly = parseCurrencyToNumber(investmentData.monthlyValue);
    const period = parseInt(investmentData.period);
    const rate = parseCurrencyToNumber(investmentData.rate);

    if (initial < 0) errors.initialValue = "Valor inicial não pode ser negativo.";
    if (monthly < 0) errors.monthlyValue = "Valor mensal não pode ser negativo.";
    if (period <= 0 || isNaN(period)) errors.period = "Período deve ser um número positivo de meses.";
    if (rate < 0 || isNaN(rate)) errors.rate = "Taxa de juros deve ser um número positivo.";

    setInvestmentErrors(errors);
    return Object.keys(errors).length === 0;
  }, [investmentData]);

  const calculateInvestment = useCallback((): InvestmentResult => {
    if (!validateInvestmentInputs()) {
      return { finalValue: 0, totalInvested: 0, earnings: 0 };
    }

    const initial = parseCurrencyToNumber(investmentData.initialValue);
    const monthly = parseCurrencyToNumber(investmentData.monthlyValue);
    const months = parseInt(investmentData.period);
    const annualRate = parseCurrencyToNumber(investmentData.rate);

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
  }, [investmentData, validateInvestmentInputs]);

  const investmentResult = useMemo(() => calculateInvestment(), [calculateInvestment]);

  // --- Lógica do Simulador de Aposentadoria ---
  const validateRetirementInputs = useCallback(() => {
    const errors: InputErrors = {};
    const currentAge = parseInt(retirementData.currentAge);
    const retirementAge = parseInt(retirementData.retirementAge);
    const desiredIncome = parseCurrencyToNumber(retirementData.desiredIncome);
    const expectedAnnualReturn = parseCurrencyToNumber(retirementData.expectedAnnualReturn);

    if (currentAge <= 0 || isNaN(currentAge)) errors.currentAge = "Idade atual deve ser um número positivo.";
    if (retirementAge <= currentAge || isNaN(retirementAge)) errors.retirementAge = "Idade de aposentadoria deve ser maior que a idade atual.";
    if (desiredIncome <= 0 || isNaN(desiredIncome)) errors.desiredIncome = "Renda desejada deve ser um valor positivo.";
    if (expectedAnnualReturn <= 0 || isNaN(expectedAnnualReturn)) errors.expectedAnnualReturn = "Taxa de retorno esperada deve ser um número positivo.";

    setRetirementErrors(errors);
    return Object.keys(errors).length === 0;
  }, [retirementData]);

  const calculateRetirement = useCallback((): RetirementResult => {
    if (!validateRetirementInputs()) {
      return { neededCapital: 0, monthlyContribution: 0, yearsToRetire: 0 };
    }

    const currentAge = parseInt(retirementData.currentAge);
    const retirementAge = parseInt(retirementData.retirementAge);
    const desiredIncome = parseCurrencyToNumber(retirementData.desiredIncome);
    const expectedAnnualReturn = parseCurrencyToNumber(retirementData.expectedAnnualReturn);

    const yearsToRetire = retirementAge - currentAge;
    const monthsToRetire = yearsToRetire * 12;
    const monthlyReturnRate = expectedAnnualReturn / 100 / 12;

    // Constante para a regra dos 4% (ou outra taxa de saque segura anual)
    const SAFE_WITHDRAWAL_RATE_PERCENT = 4; // Por exemplo, 4% ao ano
    const neededCapital = (desiredIncome * 12) / (SAFE_WITHDRAWAL_RATE_PERCENT / 100);

    let monthlyContribution = 0;
    if (monthsToRetire > 0 && monthlyReturnRate > 0) {
      // Fórmula da Parcela do Valor Futuro (Future Value of an Annuity)
      // P = FV * [r / ((1 + r)^n - 1)]
      monthlyContribution = neededCapital * (monthlyReturnRate / (Math.pow(1 + monthlyReturnRate, monthsToRetire) - 1));
    } else if (monthsToRetire > 0) {
      // Caso a taxa de retorno seja 0, contribuição linear simples
      monthlyContribution = neededCapital / monthsToRetire;
    }

    return {
      neededCapital,
      monthlyContribution,
      yearsToRetire
    };
  }, [retirementData, validateRetirementInputs]);

  const retirementResult = useMemo(() => calculateRetirement(), [calculateRetirement]);

  // --- Configurações dos Simuladores (dados estáticos) ---
  const simulatorsConfig = useMemo(() => ({
    investimento: {
      title: "Simulador de Investimentos",
      description: "Calcule quanto seu dinheiro pode render ao longo do tempo"
    },
    aposentadoria: {
      title: "Simulador de Aposentadoria",
      description: "Planeje sua aposentadoria e descubra quanto capital precisa e quanto precisa investir mensalmente."
    }
  }), []);

  // --- Handlers de Mudança para Inputs ---
  const handleInvestmentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInvestmentData((prev) => ({ ...prev, [id]: value }));
    setInvestmentErrors((prev) => ({ ...prev, [id]: undefined })); // Limpar erro ao digitar
  }, []);

  const handleRetirementChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRetirementData((prev) => ({ ...prev, [id]: value }));
    setRetirementErrors((prev) => ({ ...prev, [id]: undefined })); // Limpar erro ao digitar
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation /> {/* Mantenha sua navegação aqui */}

      <main className="pt-8 sm:pt-16 md:pt-20">
        {/* Header */}
        <section className="fintech-gradient py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Simuladores Financeiros
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Ferramentas gratuitas para planejar seu futuro financeiro
            </p>
          </div>
        </section>

        {/* Seleção do Simulador */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="flex bg-white rounded-lg shadow-lg p-1.5 md:p-2">
                {Object.entries(simulatorsConfig).map(([key, simulator]) => (
                  <Button
                    key={key}
                    onClick={() => setSelectedSimulator(key as 'investimento' | 'aposentadoria')}
                    variant={selectedSimulator === key ? "default" : "ghost"}
                    className={`mx-0.5 md:mx-1 ${selectedSimulator === key ? 'bg-[#1A247E] text-white hover:bg-[#1A247E]/90' : 'hover:bg-gray-100'} rounded-md text-sm md:text-base px-3 py-2 transition-colors duration-200`}
                    aria-pressed={selectedSimulator === key}
                    aria-label={`Selecionar simulador de ${simulator.title.replace('Simulador de ', '')}`}
                  >
                    {simulator.title.replace('Simulador de ', '')}
                  </Button>
                ))}
              </div>
            </div>

            <Card className="max-w-4xl mx-auto shadow-xl">
              <CardHeader className="text-center pb-4 md:pb-6">
                <CardTitle className="text-2xl md:text-3xl text-gray-900">
                  {simulatorsConfig[selectedSimulator].title}
                </CardTitle>
                <CardDescription className="text-md md:text-lg text-gray-600">
                  {simulatorsConfig[selectedSimulator].description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                {selectedSimulator === 'investimento' && (
                  <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-5">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Dados do Investimento</h3>

                      <div>
                        <Label htmlFor="initialValue" className="mb-1 block text-sm font-medium text-gray-700">Valor Inicial (R$)</Label>
                        <Input
                          id="initialValue"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*[.,]?[0-9]*"
                          placeholder="1.000,00"
                          value={investmentData.initialValue}
                          onChange={handleInvestmentChange}
                          className={`focus:ring-[#1A247E] focus:border-[#1A247E] ${investmentErrors.initialValue ? 'border-red-500' : ''}`}
                          aria-invalid={!!investmentErrors.initialValue}
                          aria-describedby={investmentErrors.initialValue ? "error-initial-value" : undefined}
                        />
                        {investmentErrors.initialValue && <p id="error-initial-value" className="text-red-500 text-sm mt-1">{investmentErrors.initialValue}</p>}
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
                          onChange={handleInvestmentChange}
                          className={`focus:ring-[#1A247E] focus:border-[#1A247E] ${investmentErrors.monthlyValue ? 'border-red-500' : ''}`}
                          aria-invalid={!!investmentErrors.monthlyValue}
                          aria-describedby={investmentErrors.monthlyValue ? "error-monthly-value" : undefined}
                        />
                        {investmentErrors.monthlyValue && <p id="error-monthly-value" className="text-red-500 text-sm mt-1">{investmentErrors.monthlyValue}</p>}
                      </div>

                      <div>
                        <Label htmlFor="period" className="mb-1 block text-sm font-medium text-gray-700">Período (meses)</Label>
                        <Input
                          id="period"
                          type="number"
                          placeholder="60"
                          value={investmentData.period}
                          onChange={handleInvestmentChange}
                          className={`focus:ring-[#1A247E] focus:border-[#1A247E] ${investmentErrors.period ? 'border-red-500' : ''}`}
                          aria-invalid={!!investmentErrors.period}
                          aria-describedby={investmentErrors.period ? "error-period" : undefined}
                        />
                        {investmentErrors.period && <p id="error-period" className="text-red-500 text-sm mt-1">{investmentErrors.period}</p>}
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
                          onChange={handleInvestmentChange}
                          className={`focus:ring-[#1A247E] focus:border-[#1A247E] ${investmentErrors.rate ? 'border-red-500' : ''}`}
                          aria-invalid={!!investmentErrors.rate}
                          aria-describedby={investmentErrors.rate ? "error-rate" : undefined}
                        />
                        {investmentErrors.rate && <p id="error-rate" className="text-red-500 text-sm mt-1">{investmentErrors.rate}</p>}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col justify-center">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Resultado da Simulação</h3>
                      {Object.keys(investmentErrors).length > 0 ? (
                        <p className="text-center text-red-500 mt-4">Corrija os erros para ver o resultado.</p>
                      ) : (
                        (investmentData.initialValue || investmentData.monthlyValue) && investmentData.period && investmentData.rate ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="text-gray-600">Valor Final:</span>
                              <span className="font-bold text-xl text-green-600">
                                R$ {formatNumberToCurrency(investmentResult.finalValue)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="text-gray-600">Total Investido:</span>
                              <span className="font-semibold text-lg text-gray-800">
                                R$ {formatNumberToCurrency(investmentResult.totalInvested)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-600">Rendimento:</span>
                              <span className="font-bold text-lg text-blue-600">
                                R$ {formatNumberToCurrency(investmentResult.earnings)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-center text-gray-500 mt-4">Preencha os campos para ver o resultado.</p>
                        )
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
                          onChange={handleRetirementChange}
                          className={`focus:ring-[#1A247E] focus:border-[#1A247E] ${retirementErrors.currentAge ? 'border-red-500' : ''}`}
                          aria-invalid={!!retirementErrors.currentAge}
                          aria-describedby={retirementErrors.currentAge ? "error-current-age" : undefined}
                        />
                        {retirementErrors.currentAge && <p id="error-current-age" className="text-red-500 text-sm mt-1">{retirementErrors.currentAge}</p>}
                      </div>

                      <div>
                        <Label htmlFor="retirementAge" className="mb-1 block text-sm font-medium text-gray-700">Idade de Aposentadoria</Label>
                        <Input
                          id="retirementAge"
                          type="number"
                          placeholder="65"
                          value={retirementData.retirementAge}
                          onChange={handleRetirementChange}
                          className={`focus:ring-[#1A247E] focus:border-[#1A247E] ${retirementErrors.retirementAge ? 'border-red-500' : ''}`}
                          aria-invalid={!!retirementErrors.retirementAge}
                          aria-describedby={retirementErrors.retirementAge ? "error-retirement-age" : undefined}
                        />
                        {retirementErrors.retirementAge && <p id="error-retirement-age" className="text-red-500 text-sm mt-1">{retirementErrors.retirementAge}</p>}
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
                          onChange={handleRetirementChange}
                          className={`focus:ring-[#1A247E] focus:border-[#1A247E] ${retirementErrors.desiredIncome ? 'border-red-500' : ''}`}
                          aria-invalid={!!retirementErrors.desiredIncome}
                          aria-describedby={retirementErrors.desiredIncome ? "error-desired-income" : undefined}
                        />
                        {retirementErrors.desiredIncome && <p id="error-desired-income" className="text-red-500 text-sm mt-1">{retirementErrors.desiredIncome}</p>}
                      </div>

                      <div>
                        <Label htmlFor="expectedAnnualReturn" className="mb-1 block text-sm font-medium text-gray-700">Taxa de Retorno Anual Esperada (%)</Label>
                        <Input
                          id="expectedAnnualReturn"
                          type="text"
                          inputMode="decimal"
                          pattern="[0-9]*[.,]?[0-9]*"
                          placeholder="7.0"
                          step="0.1"
                          value={retirementData.expectedAnnualReturn}
                          onChange={handleRetirementChange}
                          className={`focus:ring-[#1A247E] focus:border-[#1A247E] ${retirementErrors.expectedAnnualReturn ? 'border-red-500' : ''}`}
                          aria-invalid={!!retirementErrors.expectedAnnualReturn}
                          aria-describedby={retirementErrors.expectedAnnualReturn ? "error-expected-annual-return" : undefined}
                        />
                        {retirementErrors.expectedAnnualReturn && <p id="error-expected-annual-return" className="text-red-500 text-sm mt-1">{retirementErrors.expectedAnnualReturn}</p>}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col justify-center">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Plano de Aposentadoria</h3>
                      {Object.keys(retirementErrors).length > 0 ? (
                        <p className="text-center text-red-500 mt-4">Corrija os erros para ver o plano de aposentadoria.</p>
                      ) : (
                        retirementData.currentAge && retirementData.retirementAge && retirementData.desiredIncome && retirementData.expectedAnnualReturn ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="text-gray-600">Anos para aposentar:</span>
                              <span className="font-bold text-lg text-gray-800">{retirementResult.yearsToRetire} anos</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                              <span className="text-gray-600">Capital necessário:</span>
                              <span className="font-bold text-xl text-blue-600">
                                R$ {formatNumberToCurrency(retirementResult.neededCapital)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-gray-600">Investimento mensal sugerido:</span>
                              <span className="font-bold text-lg text-green-600">
                                R$ {formatNumberToCurrency(retirementResult.monthlyContribution)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                              *O capital necessário é uma estimativa baseada na Regra dos 4% (ou taxa de saque segura anual configurada).
                              O investimento mensal sugerido considera a taxa de retorno esperada dos seus investimentos antes da aposentadoria.
                              Esta simulação não considera inflação ou impostos.
                            </p>
                          </div>
                        ) : (
                          <p className="text-center text-gray-500 mt-4">Preencha os campos para ver o plano de aposentadoria.</p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Simuladores;
