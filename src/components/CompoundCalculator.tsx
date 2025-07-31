import { useState, useCallback } from "react";
import { useForm } from "react-hook-form"; // Importar useForm
import { z } from "zod"; // Importar Zod
import { zodResolver } from "@hookform/resolvers/zod"; // Importar zodResolver
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, Repeat, Percent, Clock } from "lucide-react"; // Adicionados mais ícones
import { toast } from "sonner"; // Para feedback ao usuário

// --- Esquema de Validação com Zod ---
// Define as regras de validação para os campos do formulário.
const calculatorSchema = z.object({
  principal: z.number()
    .min(0.01, "O valor inicial deve ser maior que zero.")
    .max(1_000_000_000, "Valor inicial muito alto.")
    .default(1000), // Valor padrão para o esquema, caso não seja fornecido
  monthlyContribution: z.number()
    .min(0, "A contribuição mensal não pode ser negativa.")
    .max(1_000_000_000, "Contribuição mensal muito alta.")
    .default(200),
  annualRate: z.number()
    .min(0.01, "A taxa de retorno anual deve ser maior que zero.")
    .max(300, "Taxa de retorno anual irrealista (max 300%).")
    .default(12),
  years: z.number()
    .min(1, "O período deve ser de no mínimo 1 ano.")
    .max(100, "O período máximo é de 100 anos.")
    .int("O período deve ser um número inteiro de anos.")
    .default(10),
}).transform(data => ({ // Transforma strings para números antes da validação principal
  principal: Number(data.principal),
  monthlyContribution: Number(data.monthlyContribution),
  annualRate: Number(data.annualRate),
  years: Number(data.years),
}));

// Infere o tipo TypeScript a partir do esquema Zod.
type CalculatorFormData = z.infer<typeof calculatorSchema>;

// --- Componente CompoundCalculator ---
const CompoundCalculator = () => {
  // Estado para armazenar o resultado do cálculo.
  const [result, setResult] = useState<{
    finalAmount: number;
    totalContributed: number;
    totalInterest: number;
  } | null>(null);

  // Estado para controlar o carregamento do cálculo.
  const [isLoading, setIsLoading] = useState(false);

  // Configura o react-hook-form com o zodResolver para validação.
  const {
    register, // Função para registrar os inputs
    handleSubmit, // Função para lidar com a submissão do formulário
    formState: { errors, isValid }, // Objeto de erros e estado de validade do formulário
    getValues, // Para acessar os valores atuais do formulário
    watch, // Para observar mudanças nos campos em tempo real (opcional aqui, mas útil)
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema), // Resolve a validação com Zod
    mode: 'onChange', // Valida os campos à medida que o usuário digita
    defaultValues: { // Define valores iniciais para os campos do formulário
      principal: 1000,
      monthlyContribution: 200,
      annualRate: 12,
      years: 10,
    },
  });

  // Função para calcular os juros compostos.
  // Será chamada pelo handleSubmit após a validação bem-sucedida.
  const calculateCompound = useCallback(async (data: CalculatorFormData) => {
    setIsLoading(true);
    // Pequeno atraso simulado para demonstrar o estado de carregamento
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const { principal, monthlyContribution, annualRate, years } = data;

    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;
    
    // Cálculo do montante final a partir do valor inicial
    const principalAmount = principal * Math.pow(1 + monthlyRate, totalMonths);
    
    // Cálculo do montante final a partir das contribuições mensais
    // Adaptação para evitar divisão por zero se monthlyRate for 0
    const contributionAmount = monthlyRate === 0 
      ? monthlyContribution * totalMonths
      : monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const finalAmount = principalAmount + contributionAmount;
    const totalContributed = principal + (monthlyContribution * totalMonths);
    const totalInterest = finalAmount - totalContributed;
    
    setResult({
      finalAmount,
      totalContributed,
      totalInterest
    });
    setIsLoading(false);
    toast.success("Cálculo realizado com sucesso!");
  }, []);

  // Formata um número para moeda brasileira (Real).
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900"> {/* Fundo mais neutro */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Calculadora de
            <span className="block text-[#1A247E] dark:text-[#2D4DE0]">Juros Compostos</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra o poder dos juros compostos e projete o crescimento do seu patrimônio ao longo do tempo.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10"> {/* Aumentado o gap */}
          {/* Cartão de Entrada de Dados */}
          <Card className="shadow-xl border-t-4 border-[#1A247E] dark:border-[#2D4DE0] bg-white dark:bg-gray-800 transition-shadow duration-300 hover:shadow-2xl">
            <CardHeader className="border-b pb-4 mb-4">
              <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-gray-800 dark:text-white">
                <Calculator className="h-7 w-7 text-[#1A247E] dark:text-[#2D4DE0]" />
                Simule seu Investimento
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Preencha os campos abaixo para visualizar a projeção do seu capital.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(calculateCompound)} className="space-y-6"> {/* Formulário com handleSubmit */}
                {/* Valor Inicial */}
                <div>
                  <Label htmlFor="principal" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    Valor Inicial (R$)
                  </Label>
                  <Input
                    id="principal"
                    type="number"
                    step="0.01"
                    {...register("principal", { valueAsNumber: true })} // Registra o campo e converte para número
                    className={`mt-1 ${errors.principal ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E] dark:focus-visible:ring-[#2D4DE0] dark:bg-gray-700 dark:text-white'}`}
                    aria-invalid={!!errors.principal}
                    aria-describedby={errors.principal ? "principal-error" : undefined}
                    disabled={isLoading}
                  />
                  {errors.principal && (
                    <p id="principal-error" role="alert" className="text-sm text-destructive mt-1">
                      {errors.principal.message}
                    </p>
                  )}
                </div>
                
                {/* Contribuição Mensal */}
                <div>
                  <Label htmlFor="monthlyContribution" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <Repeat className="h-5 w-5 text-gray-500" />
                    Contribuição Mensal (R$)
                  </Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    step="0.01"
                    {...register("monthlyContribution", { valueAsNumber: true })}
                    className={`mt-1 ${errors.monthlyContribution ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E] dark:focus-visible:ring-[#2D4DE0] dark:bg-gray-700 dark:text-white'}`}
                    aria-invalid={!!errors.monthlyContribution}
                    aria-describedby={errors.monthlyContribution ? "monthly-contribution-error" : undefined}
                    disabled={isLoading}
                  />
                  {errors.monthlyContribution && (
                    <p id="monthly-contribution-error" role="alert" className="text-sm text-destructive mt-1">
                      {errors.monthlyContribution.message}
                    </p>
                  )}
                </div>
                
                {/* Taxa de Retorno Anual */}
                <div>
                  <Label htmlFor="annualRate" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <Percent className="h-5 w-5 text-gray-500" />
                    Taxa de Retorno Anual (%)
                  </Label>
                  <Input
                    id="annualRate"
                    type="number"
                    step="0.1"
                    {...register("annualRate", { valueAsNumber: true })}
                    className={`mt-1 ${errors.annualRate ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E] dark:focus-visible:ring-[#2D4DE0] dark:bg-gray-700 dark:text-white'}`}
                    aria-invalid={!!errors.annualRate}
                    aria-describedby={errors.annualRate ? "annual-rate-error" : undefined}
                    disabled={isLoading}
                  />
                  {errors.annualRate && (
                    <p id="annual-rate-error" role="alert" className="text-sm text-destructive mt-1">
                      {errors.annualRate.message}
                    </p>
                  )}
                </div>
                
                {/* Período */}
                <div>
                  <Label htmlFor="years" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <Clock className="h-5 w-5 text-gray-500" />
                    Período (anos)
                  </Label>
                  <Input
                    id="years"
                    type="number"
                    {...register("years", { valueAsNumber: true })}
                    className={`mt-1 ${errors.years ? 'border-destructive ring-destructive' : 'border-gray-300 focus-visible:ring-[#1A247E] dark:focus-visible:ring-[#2D4DE0] dark:bg-gray-700 dark:text-white'}`}
                    aria-invalid={!!errors.years}
                    aria-describedby={errors.years ? "years-error" : undefined}
                    disabled={isLoading}
                  />
                  {errors.years && (
                    <p id="years-error" role="alert" className="text-sm text-destructive mt-1">
                      {errors.years.message}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-[#1A247E] hover:bg-[#2D4DE0] text-white text-lg py-3 rounded-md transition-colors duration-200"
                  disabled={isLoading || !isValid} // Desabilita se estiver carregando ou formulário inválido
                  aria-label={isLoading ? "Calculando..." : "Calcular crescimento"}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Calculando...
                    </>
                  ) : (
                    "Calcular"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Cartão de Resultados */}
          <Card className="shadow-xl bg-gradient-to-br from-[#1A247E]/5 to-[#2D4DE0]/5 border-t-4 border-[#2D4DE0] dark:border-[#1A247E] transition-shadow duration-300 hover:shadow-2xl">
            <CardHeader className="border-b pb-4 mb-4">
              <CardTitle className="text-2xl font-semibold text-[#1A247E] dark:text-[#2D4DE0]">
                Seus Resultados
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Visualize a projeção do seu investimento com juros compostos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Valor Final */}
                  <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
                    <p className="text-3xl lg:text-4xl font-extrabold text-[#1A247E] dark:text-[#2D4DE0] mb-2">
                      {formatCurrency(result.finalAmount)}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Valor Final Estimado</p>
                  </div>
                  
                  {/* Total Contribuído e Juros Ganhos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                      <p className="text-xl font-semibold text-gray-800 dark:text-white">
                        {formatCurrency(result.totalContributed)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Investido por Você</p>
                    </div>
                    
                    <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                      <p className="text-xl font-semibold text-green-600 dark:text-green-400"> {/* Cor para o juro */}
                        {formatCurrency(result.totalInterest)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Juros Ganhos</p>
                    </div>
                  </div>
                  
                  {/* Percentual de Crescimento */}
                  <div className="text-center text-base text-gray-600 dark:text-gray-300 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                    Seu dinheiro cresceu aproximadamente{' '}
                    <span className="font-bold text-[#1A247E] dark:text-[#2D4DE0]">
                      {((result.finalAmount / result.totalContributed - 1) * 100).toFixed(2)}%
                    </span>
                    {' '}sobre o valor total investido.
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  Insira seus dados ao lado e clique em "Calcular" para ver o seu dinheiro trabalhar para você!
                  <Calculator className="h-12 w-12 mx-auto mt-6 text-gray-300 dark:text-gray-600" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CompoundCalculator;