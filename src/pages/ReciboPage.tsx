import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ReciboPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const plano = searchParams.get('plano');
  const valor = searchParams.get('valor');
  const nomeCliente = searchParams.get('nome');
  const dataCompra = searchParams.get('data');
  const idTransacao = searchParams.get('id');

  const formattedDate = dataCompra 
    ? format(new Date(dataCompra), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR }) 
    : 'Data não disponível';

  useEffect(() => {
   
    const handlePrint = () => {
      window.print();
    };

    window.addEventListener('load', handlePrint);

    return () => {
      window.removeEventListener('load', handlePrint);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="no-print">
        <Navigation />
      </div>

      <div className="pt-20 py-16 flex justify-center items-center print-page">
        <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1A247E] mb-2">
                Recibo de Compra
              </CardTitle>
              <CardDescription className="text-gray-600">
                Obrigado pela sua compra! Abaixo estão os detalhes do seu pedido.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Plano Adquirido</h4>
                  <p className="text-gray-600">{plano || 'Não especificado'}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Valor Total</h4>
                  <p className="text-gray-600 font-bold">{valor || 'Não especificado'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Cliente</h4>
                  <p className="text-gray-600">{nomeCliente || 'Não especificado'}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Data da Compra</h4>
                  <p className="text-gray-600">{formattedDate}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800">ID da Transação</h4>
                <p className="text-gray-600 font-mono text-sm">{idTransacao || 'Não especificado'}</p>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="text-center text-gray-500 text-sm">
                Este recibo serve como prova de compra e foi gerado automaticamente.
                <br />
                Para suporte, entre em contato com nossa equipe.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReciboPage;