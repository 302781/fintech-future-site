import React, { useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Importe Button para o botão de impressão
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Printer } from 'lucide-react'; // Ícone para o botão de impressão
import { toast } from 'sonner'; // Para notificações

/**
 * Componente ReciboPage
 * Exibe os detalhes de uma compra e permite a impressão do recibo.
 * Os dados do pedido são passados via parâmetros de URL.
 */
const ReciboPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extrai os parâmetros da URL. Use useMemo para evitar recriação desnecessária.
  const plano = useMemo(() => searchParams.get('plano'), [searchParams]);
  const valor = useMemo(() => searchParams.get('valor'), [searchParams]);
  const nomeCliente = useMemo(() => searchParams.get('nome'), [searchParams]);
  const dataCompra = useMemo(() => searchParams.get('data'), [searchParams]);
  const idTransacao = useMemo(() => searchParams.get('id'), [searchParams]);

  // Formata a data para exibição. Use useMemo para memoizar o resultado.
  const formattedDate = useMemo(() => {
    if (dataCompra) {
      try {
        return format(new Date(dataCompra), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
      } catch (e) {
        console.error("Erro ao formatar data:", e);
        return 'Data inválida';
      }
    }
    return 'Data não disponível';
  }, [dataCompra]);

  // Verifica se todos os parâmetros essenciais estão presentes
  useEffect(() => {
    if (!plano || !valor || !nomeCliente || !dataCompra || !idTransacao) {
      toast.error('Detalhes do recibo incompletos. Redirecionando para a página inicial.');
      navigate('/', { replace: true });
    }
  }, [plano, valor, nomeCliente, dataCompra, idTransacao, navigate]);

  /**
   * Lida com o evento de impressão da página.
   * Usado por um botão para dar controle ao usuário.
   */
  const handlePrint = useCallback(() => {
    window.print();
  }, []); // Nenhuma dependência, pois é uma função simples de impressão

  // Se os dados essenciais estiverem faltando, exibe uma mensagem de carregamento/erro enquanto redireciona
  if (!plano || !valor || !nomeCliente || !dataCompra || !idTransacao) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Carregando detalhes do recibo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Classe 'no-print' para esconder elementos que não devem aparecer na impressão */}
      {/* Certifique-se de adicionar CSS para `no-print` em seu arquivo global de estilos:
          @media print {
            .no-print {
              display: none !important;
            }
          }
      */}
      <div className="no-print">
        <Navigation />
      </div>

      <main className="pt-20 py-16 flex justify-center items-center print-page">
        <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-[#1A247E]">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-[#1A247E] mb-2">
                Recibo de Compra
              </CardTitle>
              <CardDescription className="text-gray-600">
                Obrigado pela sua compra! Abaixo estão os detalhes do seu pedido.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                {/* Detalhes do Plano */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Plano Adquirido</h4>
                  <p className="text-gray-600 font-medium">{plano}</p>
                </div>
                {/* Valor Total */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Valor Total</h4>
                  <p className="text-gray-600 font-bold text-xl">R$ {valor}</p>
                </div>
                {/* Cliente */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Cliente</h4>
                  <p className="text-gray-600">{nomeCliente}</p>
                </div>
                {/* Data da Compra */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Data da Compra</h4>
                  <p className="text-gray-600">{formattedDate}</p>
                </div>
              </div>

              {/* ID da Transação */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800">ID da Transação</h4>
                <p className="text-gray-600 font-mono text-sm break-all">{idTransacao}</p>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="text-center text-gray-500 text-sm">
                Este recibo serve como prova de compra e foi gerado automaticamente.
                <br />
                Para suporte, entre em contato com nossa equipe.
              </div>
            </CardContent>
          </Card>

          {/* Botão de Imprimir (visível apenas na tela, não na impressão) */}
          <div className="no-print mt-6 text-center">
            <Button
              onClick={handlePrint}
              className="bg-[#1A247E] hover:bg-[#2D4DE0] text-white py-3 px-6 text-lg"
              aria-label="Imprimir recibo"
            >
              <Printer className="w-5 h-5 mr-2" /> Imprimir Recibo
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReciboPage;
